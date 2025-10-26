import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

type AnnouncementCategory =
  | "institucional"
  | "academico"
  | "oportunidad"
  | "comunidad"
  | "externo";

export const CreateAnnouncementForm: React.FC = () => {
  const [category, setCategory] = useState<AnnouncementCategory>("institucional");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setAttachment(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let attachment_url: string | null = null;

      if (attachment) {
        const fileExt = attachment.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        // Subir archivo al bucket "announcements"
        const { error: uploadError } = await supabase.storage
          .from("announcements")
          .upload(fileName, attachment, { cacheControl: "3600", upsert: false });

        if (uploadError) throw uploadError;

        // Obtener URL pública
        const { data: publicData } = supabase.storage
          .from("announcements")
          .getPublicUrl(fileName);

        attachment_url = publicData.publicUrl;
      }

      // Insertar en la tabla "announcements"
      const { error: insertError } = await supabase.from("announcements").insert([
        {
          category,
          title,
          description,
          date,
          attachment_url,
          link,
        },
      ]);

      if (insertError) throw insertError;

      // Reset
      setCategory("institucional");
      setTitle("");
      setDescription("");
      setDate("");
      setAttachment(null);
      setLink("");
      setPreview(null);

      alert("✅ Anuncio creado correctamente!");
    } catch (error) {
      console.error("Error creando anuncio:", error);
      alert("❌ Error al crear anuncio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-xl mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800">Crear Anuncio</h2>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium mb-1">Categoría del anuncio</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
          className="w-full border rounded-md p-2"
        >
          <option value="institucional">🏛️ Institucional</option>
          <option value="academico">📚 Académico</option>
          <option value="oportunidad">🎓 Oportunidades</option>
          <option value="comunidad">👥 Comunidad</option>
          <option value="externo">🌐 Externo</option>
        </select>
      </div>

      {/* Título */}
      <div>
        <label className="block text-sm font-medium mb-1">Título del anuncio</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Suspensión de clases viernes 20 de marzo"
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Explica el comunicado, detalles del evento o recordatorio..."
          className="w-full border rounded-md p-2"
          rows={3}
        />
      </div>

      {/* Fecha de publicación */}
      <div>
        <label className="block text-sm font-medium mb-1">Fecha de publicación</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Archivo adjunto */}
      <div>
        <label className="block text-sm font-medium mb-1">Archivo adjunto (opcional)</label>
        <input type="file" onChange={handleFileChange} className="w-full" />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-2 max-h-40 object-cover rounded-md border"
          />
        )}
      </div>

      {/* Link de más información */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Enlace de inscripción o más info (opcional)
        </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Ej: https://ciafhub.com/anuncios/123"
          className="w-full border rounded-md p-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Subiendo..." : "Crear Anuncio"}
      </button>
    </form>
  );
};
