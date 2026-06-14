// Proof for the FolioDev preview ready resend contract (T0306).
//
// Verifies that the template runtime posts ready more than once while the parent has not sent a
// valid channel-bound update, ignores invalid/wrong-channel updates, and stops ready retries after
// a valid update message is accepted.

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "../node_modules/typescript/lib/typescript.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");

let failures = 0;
function assert(condition, label) {
  if (condition) {
    console.log(`  ok  ${label}`);
  } else {
    failures += 1;
    console.error(`  FAIL ${label}`);
  }
}

function transpile(source) {
  return ts
    .transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    })
    .outputText.replace(/from "(\.\.?\/[^"]+)"/g, 'from "$1.js"');
}

const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "foliodev-ready-retry-proof-"));
await fs.writeFile(path.join(tempRoot, "package.json"), JSON.stringify({ type: "module" }));

async function emit(relPath) {
  const source = await fs.readFile(path.join(repoRoot, "src", relPath), "utf8");
  const outPath = path.join(tempRoot, relPath.replace(/\.tsx?$/, ".js"));
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, transpile(source));
}

for (const relPath of ["preview/previewMessages.ts", "preview/previewActivation.ts", "preview/previewReadyRetry.ts"]) {
  await emit(relPath);
}

const messagesModule = await import(pathToFileURL(path.join(tempRoot, "preview", "previewMessages.js")).href);
const activationModule = await import(pathToFileURL(path.join(tempRoot, "preview", "previewActivation.js")).href);
const retryModule = await import(pathToFileURL(path.join(tempRoot, "preview", "previewReadyRetry.js")).href);

const {
  createPreviewReadyMessage,
  isFolioDevTemplatePreviewMessage,
  FOLIODEV_TEMPLATE_PREVIEW_CHANNEL_PARAM,
  FOLIODEV_TEMPLATE_PREVIEW_PARENT_ORIGIN_PARAM,
} = messagesModule;
const {
  FOLIODEV_TEMPLATE_PREVIEW_MODE_PARAM,
  isFolioDevPreviewLocation,
  isFolioDevPreviewSearch,
} = activationModule;
const {
  FOLIODEV_PREVIEW_READY_RETRY_DELAYS_MS,
  startFolioDevPreviewReadyRetry,
} = retryModule;

const channelId = "preview_retry_proof_channel";
const postedMessages = [];
const timers = [];
let nextTimerId = 1;

function setTimer(callback, delay) {
  const timer = { id: nextTimerId, callback, delay, cleared: false };
  timers.push(timer);
  nextTimerId += 1;
  return timer.id;
}

function clearTimer(id) {
  const timer = timers.find((entry) => entry.id === id);
  if (timer) {
    timer.cleared = true;
  }
}

function runTimerAt(delay) {
  const timer = timers.find((entry) => entry.delay === delay);
  if (!timer || timer.cleared) {
    return;
  }
  timer.callback();
}

function emptyPreviewData() {
  return {
    siteConfig: {},
    profile: {},
    projects: [],
    skills: {},
    education: [],
    experience: [],
    socialLinks: {},
    navigation: [],
  };
}

function updateMessage(overrides = {}) {
  return {
    type: "foliodev:preview:update",
    version: "1",
    templateId: "personal-portfolioex1",
    channelId,
    data: emptyPreviewData(),
    ...overrides,
  };
}

console.log("FolioDev preview ready retry proof");

const realFolioDevIframeSearch = new URLSearchParams({
  [FOLIODEV_TEMPLATE_PREVIEW_CHANNEL_PARAM]: channelId,
  [FOLIODEV_TEMPLATE_PREVIEW_PARENT_ORIGIN_PARAM]: "http://127.0.0.1:5199",
}).toString();

assert(
  isFolioDevPreviewSearch(`?${realFolioDevIframeSearch}`),
  "real FolioDev iframe query shape starts preview mode",
);
assert(
  isFolioDevPreviewSearch(`?${FOLIODEV_TEMPLATE_PREVIEW_MODE_PARAM}=1`),
  "legacy explicit preview flag starts preview mode",
);
assert(
  isFolioDevPreviewLocation({ pathname: "/foliodev-preview", search: "" }, false),
  "standalone foliodev preview route starts preview mode",
);
assert(
  isFolioDevPreviewLocation({ pathname: "/", search: "" }, true),
  "copied preview runtime build starts preview mode",
);
assert(
  !isFolioDevPreviewLocation({ pathname: "/", search: "" }, false),
  "standalone demo without preview URL stays out of preview mode",
);

const retry = startFolioDevPreviewReadyRetry({
  postReady: () => postedMessages.push(createPreviewReadyMessage(channelId)),
  setTimer,
  clearTimer,
});

assert(
  timers.map((timer) => timer.delay).join(",") === FOLIODEV_PREVIEW_READY_RETRY_DELAYS_MS.join(","),
  "ready resend timers use the runtime delay contract",
);

runTimerAt(0);
assert(postedMessages.length === 1, "ready posted immediately");

runTimerAt(80);
runTimerAt(240);
assert(postedMessages.length === 3, "ready posted again while parent update is missing");

const wrongChannelUpdate = updateMessage({ channelId: "preview_wrongchannel1234" });
if (isFolioDevTemplatePreviewMessage(wrongChannelUpdate, channelId)) {
  retry.stop();
}
runTimerAt(720);
assert(postedMessages.length === 4, "wrong-channel update does not stop ready retries");

const malformedUpdate = updateMessage({ data: { projects: "not-an-array" } });
if (isFolioDevTemplatePreviewMessage(malformedUpdate, channelId)) {
  retry.stop();
}
runTimerAt(1600);
assert(postedMessages.length === 5, "invalid update does not stop ready retries");

const validUpdate = updateMessage();
assert(isFolioDevTemplatePreviewMessage(validUpdate, channelId), "valid channel-bound update is accepted");
if (isFolioDevTemplatePreviewMessage(validUpdate, channelId)) {
  retry.stop();
}

for (const delay of FOLIODEV_PREVIEW_READY_RETRY_DELAYS_MS) {
  runTimerAt(delay);
}
assert(postedMessages.length === 5, "ready retries stop after valid update");
assert(postedMessages.every((message) => message.type === "foliodev:preview:ready" && message.channelId === channelId), "all posted messages are ready messages for the expected channel");

if (failures > 0) {
  console.error(`\nFolioDev preview ready retry proof FAILED with ${failures} assertion(s).`);
  process.exit(1);
}

console.log("\nFolioDev preview ready retry proof passed.");
