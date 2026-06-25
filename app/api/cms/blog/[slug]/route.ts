import { NextRequest, NextResponse } from "next/server";
import { deleteBlogPost, getBlogPost, saveBlogPost } from "@/lib/blog";
import { requireCmsToken } from "../../auth";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const authError = requireCmsToken(request);
  if (authError) return authError;

  const { slug } = await context.params;
  const post = await getBlogPost(slug, { includeDrafts: true });
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const authError = requireCmsToken(request);
  if (authError) return authError;

  const { slug } = await context.params;
  const payload = await request.json();
  const post = await saveBlogPost({ ...payload, slug: payload.slug || slug });
  return NextResponse.json({ post });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const authError = requireCmsToken(request);
  if (authError) return authError;

  const { slug } = await context.params;
  await deleteBlogPost(slug);
  return NextResponse.json({ ok: true });
}
