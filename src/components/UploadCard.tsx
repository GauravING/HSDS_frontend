import { useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API ?? "http://localhost:8000/detect";

interface Detection {
  class: string;
  confidence: number;
  box: number[];
}

export default function UploadCard({
  onResult,
}: {
  onResult: (d: Detection[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const sendFile = async (file: File) => {
    setBusy(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(API_URL, { method: "POST", body: form });
    const detections = (await res.json()) as Detection[];
    onResult(detections);
    setBusy(false);
  };

  return (
    <div
      className="mx-auto max-w-md bg-gray-800 rounded-xl p-6 shadow-lg"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) sendFile(e.dataTransfer.files[0]);
      }}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        hidden
        onChange={(e) => e.target.files && sendFile(e.target.files[0])}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full py-3 text-lg font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-600 transition"
      >
        {busy ? "Detecting…" : "Select or Drop Image"}
      </button>
      <p className="mt-2 text-sm text-gray-400 text-center">
        JPG • PNG • WEBP up to 5 MB
      </p>
    </div>
  );
}
