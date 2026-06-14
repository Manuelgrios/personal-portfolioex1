export const FOLIODEV_PREVIEW_READY_RETRY_DELAYS_MS = [0, 80, 240, 720, 1600] as const;

type ReadyRetryTimerId = number;

export type FolioDevPreviewReadyRetryControls = {
  stop: () => void;
};

export function startFolioDevPreviewReadyRetry({
  postReady,
  setTimer,
  clearTimer,
  delays = FOLIODEV_PREVIEW_READY_RETRY_DELAYS_MS,
}: {
  postReady: () => void;
  setTimer: (callback: () => void, delay: number) => ReadyRetryTimerId;
  clearTimer: (timer: ReadyRetryTimerId) => void;
  delays?: readonly number[];
}): FolioDevPreviewReadyRetryControls {
  let stopped = false;
  const timers = delays.map((delay) =>
    setTimer(() => {
      if (!stopped) {
        postReady();
      }
    }, delay),
  );

  return {
    stop: () => {
      stopped = true;
      timers.forEach(clearTimer);
    },
  };
}
