export const deleteImage = async (publicId: string) => {
  const res = await fetch("/api/cloudinary/delete", {
    method: "POST",
    body: JSON.stringify({ publicId }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete image");
  }

  return await res.json();
};