import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

// On-demand revalidation, called by a Strapi webhook when an article is published, updated or removed.
//
//   Strapi → Settings → Webhooks → URL: https://mindforward.dk/api/revalidate?secret=<REVALIDATE_SECRET>
//   Events: entry.publish, entry.unpublish, entry.update, entry.delete
//
// Without the webhook an article still appears within a few minutes (the cache lifetime in src/lib/strapi.ts).
type Payload = { model?: string; entry?: { slug?: string } };

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  // No secret configured means the endpoint is closed, not open.
  if (!expected || request.nextUrl.searchParams.get("secret") !== expected) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const payload: Payload = await request.json().catch(() => ({}));
  if (payload.model && payload.model !== "blog-post") return NextResponse.json({ revalidated: [], model: payload.model });

  const slug = payload.entry?.slug;
  const revalidated = ["tag:blog", "path:/blog"];
  revalidateTag("blog", "max");
  revalidatePath("/blog");
  if (slug) {
    revalidateTag(`blog-${slug}`, "max");
    revalidatePath(`/blog/${slug}`);
    revalidated.push(`tag:blog-${slug}`, `path:/blog/${slug}`);
  }
  return NextResponse.json({ revalidated, slug: slug ?? null });
}
