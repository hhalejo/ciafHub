import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Announcement = {
  id: string;
  user_id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  link?: string;
  attachment_url?: string;
  created_at?: string;
};

export const AnnouncementList: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  
  const backgroundUrl =
    "https://iwuncvrdfipuclhlwgll.supabase.co/storage/v1/object/public/backgounds/texture.jpg";

  const categoryColors: Record<string, string> = {
    institucional: "bg-blue-100 border-blue-400",
    academico: "bg-green-100 border-green-400",
    oportunidad: "bg-yellow-100 border-yellow-400",
    comunidad: "bg-pink-100 border-pink-400",
    externo: "bg-gray-100 border-gray-400",
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Error al obtener anuncios:", error);
      } else {
        const updatedData = (data || []).map((a) => {
          if (!a.attachment_url?.startsWith("https://")) {
            a.attachment_url = null;
          }
          return a;
        });
        setAnnouncements(updatedData);
      }
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Cargando anuncios...
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="text-gray-800 text-lg bg-white/80 px-6 py-3 rounded-lg shadow-md">
          No hay anuncios todavía 📢
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundRepeat: "repeat",
      }}
    >
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {announcements.map((a, i) => (
          <div
            key={a.id}
            className={`
              relative p-6 rounded-2xl shadow-2xl border-2
              ${categoryColors[a.category] || "bg-white border-gray-300"}
              transform transition-all duration-300
              hover:scale-105 hover:-rotate-1
              ${i % 2 === 0 ? "rotate-1" : "-rotate-1"}
            `}
            style={{
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.15), inset 0 0 15px rgba(255,255,255,0.4)",
            }}
          >
            {/* Pin */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full shadow-inner border-2 border-red-700"></div>

            {/* Categoría */}
            <span className="absolute top-4 left-4 text-sm uppercase font-semibold text-gray-800 bg-white/90 px-3 py-1 rounded-md shadow-sm">
              {a.category}
            </span>

            {/* Imagen */}
            <div className="w-full h-70 mb-4 rounded-lg border border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden shadow-md">
              {a.attachment_url ? (
                <img
                  src={a.attachment_url}
                  alt={a.title}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <span className="text-gray-400 text-sm">📷 Sin imagen</span>
              )}
            </div>

            {/* Contenido */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{a.title}</h3>
              <div className="text-sm text-gray-500 mb-3">
                📅 {a.date || "Sin fecha"}
              </div>

              <div className="text-gray-700 text-base leading-relaxed mb-4">
                {a.description.split("\n").map((line, idx) => (
                  <p key={idx} className="mb-1">
                    {line}
                  </p>
                ))}
              </div>

              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 text-base underline hover:text-blue-800 transition"
                >
                  🔗 Más información
                </a>
              )}
            </div>

            {/* Botón eliminar */}
            <button
              onClick={() => handleDelete(a.id)}
              className="absolute top-3 right-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full hover:bg-red-600"
            >
              ✕
            </button>

            {/* Clip */}
            <div className="absolute -top-5 right-8 w-7 h-10 bg-gray-300 rounded-t-md shadow-md rotate-12"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
