/** Encode public asset paths (handles spaces & special characters on all devices). */
export function publicAssetUrl(path: string) {
  return path
    .split("/")
    .map((segment) =>
      segment === "" ? "" : encodeURIComponent(decodeURIComponent(segment)),
    )
    .join("/");
}
