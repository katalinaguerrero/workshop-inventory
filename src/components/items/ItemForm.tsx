"use client";

import { useEffect, useRef, useState } from "react";
import type { Item, ItemSpecification } from "@/types/item";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ItemTypeSelect } from "./ItemTypeSelect";
import { Title } from "../ui/Title";
import { Spinner } from "../ui/Spinner";

import { uploadImageToCloudinary } from "@/services/cloudinary/uploadImage";
import { deleteImage } from "@/services/cloudinary/deleteImage";

type Props = {
  initialData?: (Omit<Item, "id"> & {
    imgUrl?: string;
    imgPublicId?: string;
  });
  onSubmit: (data: unknown) => void;
};

export function ItemForm({ initialData, onSubmit }: Props) {
  const hydrated = useRef(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [type, setType] = useState<Item["type"] | "">("");
  const [specifications, setSpecifications] = useState<ItemSpecification[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [existingPublicId, setExistingPublicId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // INIT EDIT DATA
  useEffect(() => {
    if (!initialData) return;
    if (hydrated.current) return;

    setName(initialData.name);
    setStock(initialData.stock);
    setType(initialData.type);
    setDescription(initialData.description ?? "");
    setSpecifications(initialData.specifications ?? []);

    setImagePreview(initialData.imgUrl ?? null);
    setExistingPublicId(initialData.imgPublicId ?? null);

    hydrated.current = true;
  }, [initialData]);

  // SPECIFICATIONS
  const addSpec = () => {
    setSpecifications((prev) => [...prev, { key: "", value: "" }]);
  };

  const updateSpec = (index: number, key: string, value: string) => {
    setSpecifications((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [key]: value } : s))
    );
  };

  const removeSpec = (index: number) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!type) return;

      let imageUrl = initialData?.imgUrl || "";
      let publicId = initialData?.imgPublicId || "";

      // si hay nueva imagen
      if (imageFile) {
        // borrar anterior si existe
        if (existingPublicId) {
          await deleteImage(existingPublicId);
        }

        const uploaded = await uploadImageToCloudinary(imageFile);

        imageUrl = uploaded.url;
        publicId = uploaded.publicId;
      }

      await onSubmit({
        name,
        stock,
        type,
        description,
        specifications,
        imgUrl: imageUrl,
        imgPublicId: publicId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border border-black rounded-xl p-6"
    >
      <p>Nombre</p>
      <Input value={name} onChange={(e) => setName(e.target.value)} />

      <p>Stock Inicial</p>
      <Input
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
      />

      <p>Descripción</p>
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <p>Tipo</p>
      <ItemTypeSelect value={type} onChange={setType} />

      {/* SPECIFICATIONS */}
      <div>
        <div className="flex justify-between">
          <Title title="Especificaciones" />
          <Button type="button" onClick={addSpec}>
            Agregar
          </Button>
        </div>

        {specifications.map((s, i) => (
          <div key={i} className="flex gap-2 mt-4">
            <Input
              value={s.key}
              onChange={(e) => updateSpec(i, "key", e.target.value)}
              placeholder="Nombre"
            />
            <Input
              value={s.value}
              onChange={(e) => updateSpec(i, "value", e.target.value)}
              placeholder="Valor"
            />
            <Button type="button" onClick={() => removeSpec(i)}>
              X
            </Button>
          </div>
        ))}
      </div>

      {/* IMAGE */}
      <p>Imagen</p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          setImageFile(file);
          setImagePreview(URL.createObjectURL(file));
        }}
      />

      {imagePreview && (
        <img
          src={imagePreview}
          className="h-48 object-cover rounded border mt-2"
        />
      )}

      {/* SUBMIT */}
      <Button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2"
      >
        {loading && <Spinner />}
        {loading ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}