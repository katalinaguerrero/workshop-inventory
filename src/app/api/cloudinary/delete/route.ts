import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const { publicId } = await req.json();

  if (!publicId) {
    return Response.json({ error: "Missing publicId" }, { status: 400 });
  }

  await cloudinary.uploader.destroy(publicId);

  return Response.json({ ok: true });
}