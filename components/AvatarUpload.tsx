"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function AvatarUpload({ initial, fallback }: { initial?: string | null; fallback: string }) {
  const [preview, setPreview] = useState<string | null>(initial ?? null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/profile/avatar", { method: "POST", body: form });
    const data = await res.json();
    if (data.url) setPreview(data.url);
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="relative w-16 h-16 rounded-full overflow-hidden group focus:outline-none"
      aria-label="Change profile picture"
    >
      {preview ? (
        <Image src={preview} alt="Avatar" fill className="object-cover" />
      ) : (
        <div className="w-full h-full bg-purple-600/60 border border-purple-500/40 flex items-center justify-center text-xl font-bold">
          {fallback}
        </div>
      )}

      {/* hover overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white">
        {loading ? "..." : "Edit"}
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </button>
  );
}
