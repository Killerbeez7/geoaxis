// Usage: node scripts/generate-og-images.mjs
// Crops each source image to 1200×630 and saves it as JPG in public/images/og/.
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sources = JSON.parse(await readFile(path.resolve("src/lib/og-sources.json"), "utf8"));

const publicDir = path.resolve("public");
await mkdir(path.join(publicDir, "images/og"), { recursive: true });

for (const source of sources) {
  const name = path.basename(source, ".webp");
  const output = path.join(publicDir, "images/og", `${name}.jpg`);
  await sharp(path.join(publicDir, source))
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output);
  console.log("wrote", path.relative(process.cwd(), output));
}
