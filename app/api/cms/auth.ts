import { NextRequest, NextResponse } from "next/server";

export function requireCmsToken(request: NextRequest) {
  const configuredToken = process.env.CMS_ADMIN_TOKEN;

  if (!configuredToken) {
    return NextResponse.json(
      { error: "CMS_ADMIN_TOKEN is not configured on the server." },
      { status: 503 },
    );
  }

  const token = request.headers.get("x-cms-token") || "";
  if (token !== configuredToken) {
    return NextResponse.json({ error: "Invalid CMS token." }, { status: 401 });
  }

  return null;
}
