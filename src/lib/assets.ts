export function assetPath(path: string) {
  if (/^(https?:|data:|blob:)/i.test(path)) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
