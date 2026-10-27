import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Dev-only: saves the tile editor's positions so Claude can read them (design/tile-positions.json).
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });
  const body = await req.json();
  const dir = path.join(process.cwd(), "design");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "tile-positions.json"), JSON.stringify(body, null, 2));
  return Response.json({ ok: true });
}
