import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Dev-only: images added in the hero editor are saved to public/img/editor/ so they survive a reload.
const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });
  const form = await req.formData();
  const f = form.get("file");
  if (!(f instanceof File) || !allowed.has(f.type)) return Response.json({ error: "Kun billeder (jpg, png, webp, avif, gif)." }, { status: 400 });
  const ext = f.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const base = f.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 40) || "billede";
  const name = `${base}-${Date.now().toString(36)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "img", "editor");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await f.arrayBuffer()));
  return Response.json({ src: `/img/editor/${name}` });
}
