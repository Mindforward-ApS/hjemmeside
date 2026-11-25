// Checks every post in content/blog/ before it is pushed: front matter, lengths, markdown the site cannot show, and
// that every image file exists. Run from the repo root:  node scripts/blog-check.mjs
import fs from "node:fs";
import path from "node:path";
import { bodyImages, parsePost } from "../src/lib/blog-format.mjs";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "content", "blog");
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort() : [];
let failed = 0;

for (const file of files) {
  const { post, errors } = parsePost(file.slice(0, -3), fs.readFileSync(path.join(dir, file), "utf8"));
  const notes = [];
  if (post) {
    for (const src of [post.image, ...bodyImages(post.content)].filter(Boolean)) {
      const onDisk = path.join(root, "public", src);
      if (!fs.existsSync(onDisk)) errors.push(`billedet ${src} findes ikke (forventet: public${src})`);
      else if (fs.statSync(onDisk).size > 400 * 1024) notes.push(`${src} er ${Math.round(fs.statSync(onDisk).size / 1024)} KB - hold billeder under ca. 200 KB`);
    }
    const words = post.content.split(/\s+/).length;
    if (!post.image) notes.push("intet forsidebillede");
    if (!post.seoTitle) notes.push("seoTitle mangler (title bruges)");
    if (!post.seoDescription) notes.push("seoDescription mangler (excerpt bruges)");
    if (words < 600) notes.push(`kun ${words} ord`);
  }
  if (errors.length > 0) {
    failed += 1;
    console.log(`FEJL  ${file}`);
    for (const e of errors) console.log(`      - ${e}`);
  } else {
    console.log(`OK    ${file}${notes.length ? `  (${notes.join("; ")})` : ""}`);
  }
}

console.log(`\n${files.length} indlæg, ${failed} med fejl.`);
process.exit(failed > 0 ? 1 : 0);
