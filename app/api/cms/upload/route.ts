import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireCmsToken } from "@/app/api/cms/auth";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml", "image/avif"];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

function isS3Configured() {
  return !!(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_REGION &&
    process.env.AWS_S3_BUCKET
  );
}

async function uploadToS3(buffer: Buffer, key: string, contentType: string): Promise<string> {
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");

  const region = process.env.AWS_REGION!;
  const bucket = process.env.AWS_S3_BUCKET!;

  const clientConfig: ConstructorParameters<typeof S3Client>[0] = {
    region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  };

  // Support S3-compatible services (Cloudflare R2, MinIO, etc.)
  if (process.env.AWS_S3_ENDPOINT) {
    clientConfig.endpoint = process.env.AWS_S3_ENDPOINT;
    clientConfig.forcePathStyle = true;
  }

  const client = new S3Client(clientConfig);

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  );

  // Custom CDN / public URL prefix (CloudFront, R2 public URL, etc.)
  if (process.env.AWS_S3_PUBLIC_URL) {
    return `${process.env.AWS_S3_PUBLIC_URL.replace(/\/$/, "")}/${key}`;
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

async function uploadToLocal(buffer: Buffer, filename: string): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "blog");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/blog/${filename}`;
}

export async function POST(req: NextRequest) {
  const authError = requireCmsToken(req);
  if (authError) return authError;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "File type not allowed." }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 8 MB)." }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    let url: string;
    let storage: "s3" | "local" = "local";

    if (isS3Configured()) {
      try {
        url = await uploadToS3(buffer, `blog/${filename}`, file.type);
        storage = "s3";
      } catch (s3Err) {
        console.error("[upload] S3 failed, falling back to local storage:", s3Err);
        url = await uploadToLocal(buffer, filename);
      }
    } else {
      url = await uploadToLocal(buffer, filename);
    }

    return NextResponse.json({ url, storage });
  } catch (err) {
    console.error("[upload]", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
