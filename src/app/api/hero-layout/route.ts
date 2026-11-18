import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Dev-only: the hero editor (/preview/editor) saves its layout here so Claude can read it (design/hero-layout.json).
const file = () => path.join(process.cwd(), "design", "hero-layout.json");

export async function GET() {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });
  try {
    return new Response(await readFile(file(), "utf8"), { headers: { "Content-Type": "application/json" } });
  } catch {
    return Response.json(null);
  }
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });
  const body = await req.json();
  await mkdir(path.dirname(file()), { recursive: true });
  await writeFile(file(), JSON.stringify(body, null, 2));
  return Response.json({ ok: true });
}
