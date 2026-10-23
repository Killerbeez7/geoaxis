import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

const photoIds = new Map<string, string>();

// Several photos are saved under more than one file name, so photos are compared by content.
function photoId(src: string) {
  let id = photoIds.get(src);
  if (!id) {
    try {
      const file = path.join(process.cwd(), "public", src);
      id = createHash("sha1").update(readFileSync(file)).digest("hex");
    } catch {
      id = src;
    }
    photoIds.set(src, id);
  }
  return id;
}

/** Keeps the first appearance of each photo and returns null for repeats, so a page never shows one photo twice. */
export function withoutRepeatedPhotos(srcs: string[], alreadyShown: string[] = []) {
  const seen = new Set(alreadyShown.map(photoId));

  return srcs.map((src) => {
    const id = photoId(src);
    if (seen.has(id)) return null;
    seen.add(id);
    return src;
  });
}
