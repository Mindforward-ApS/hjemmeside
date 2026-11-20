// The blog's content source: one markdown file per post in content/blog/. A post goes live when its file is pushed
// to main and the site has been built again. No CMS, no tokens.
//
// The files are read once, when the server code loads. A post with an error stops the build with the file name and
// the reason, so a broken post never replaces a working site. Writers run `node scripts/blog-check.mjs` first.
import fs from "node:fs";
import path from "node:path";
import { parsePost } from "./blog-format.mjs";

export type BlogPost = NonNullable<ReturnType<typeof parsePost>["post"]>;

const DIR = path.join(process.cwd(), "content", "blog");

function load(): BlogPost[] {
  if (!fs.existsSync(DIR)) return [];
  const posts: BlogPost[] = [];
  for (const file of fs.readdirSync(DIR)) {
    if (!file.endsWith(".md")) continue;
    const { post, errors } = parsePost(file.slice(0, -3), fs.readFileSync(path.join(DIR, file), "utf8"));
    if (!post) throw new Error(`content/blog/${file}: ${errors.join("; ")}`);
    posts.push(post);
  }
  // Newest first; the slug settles posts from the same day, so the order never changes between builds.
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export const posts: BlogPost[] = load();

export const getPost = (slug: string) => posts.find((p) => p.slug === slug) ?? null;
