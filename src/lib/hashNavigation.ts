export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.replace(/^#/, "");

  if (!id) {
    return false;
  }

  const element = document.getElementById(decodeURIComponent(id));

  if (!element) {
    return false;
  }

  element.scrollIntoView({ behavior, block: "start" });
  return true;
}
