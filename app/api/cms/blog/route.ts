import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, saveBlogPost } from "@/lib/blog";
import { requireCmsToken } from "../auth";

export async function GET(request: NextRequest) {
  const authError = requireCmsToken(request);
  if (authError) return authError;

  const posts = await getBlogPosts({ includeDrafts: true });
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const authError = requireCmsToken(request);
  if (authError) return authError;

  const payload = await request.json();
  const post = await saveBlogPost(payload);
  return NextResponse.json({ post }, { status: 201 });
}
