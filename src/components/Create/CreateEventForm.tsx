import React, { useState } from "react";
import { supabase } from "../../lib/supabase"; // importa tu cliente supabase

export const CreateEventForm: React.FC = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const categories: Record<string, string[]> = {
    "📚 Eventos Académicos": [
      "Seminarios y conferencias",
      "Clases magistrales abiertas",
      "Talleres prácticos",
      "Simposios y congresos",
      "Defensas de proyectos de grado"
    ],
    "🛠️ Formación y Capacitación": [
      "Cursos cortos / diplomados",
      "Capacitaciones en software",
      "Bootcamps de programación/diseño",
      "Preparación para certificaciones"
    ],
    "👥 Integración y Comunidad": [
      "Feria de proyectos estudiantiles",
      "Grupos de debate y foros",
      "Concursos y olimpiadas",
      "Clubes de lectura, cine o idiomas"
    ],
    "🌐 Vinculación Externa": [
      "Feria de empleo y pasantías",
      "Networking con egresados",
      "Conferencias internacionales",
      "Convenios con otras universidades"
    ],
    "🎭 Culturales y Bienestar": [
      "Eventos artísticos y culturales",
      "Días conmemorativos",
      "Actividades deportivas",
      "Charlas de bienestar y salud mental"
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.from("eventos").insert([
        {
          category,
          subcategory,
          title,
          description,
          date,
          location,
        },
      ]);

      if (error) throw error;

      alert("✅ Evento creado correctamente");
      console.log("Evento insertado:", data);

      // limpiar formulario
      setCategory("");
      setSubcategory("");
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
    } catch (err: any) {
      console.error(err.message);
      alert("❌ Error al crear el evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Crear un nuevo evento
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory("");
            }}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Selecciona una categoría</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategoría */}
        {category && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subcategoría
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Selecciona un tipo de evento</option>
              {categories[category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título del evento
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Seminario de Investigación en Ingeniería"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explica brevemente de qué trata el evento"
            rows={4}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ej: Auditorio principal / Zoom"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Publicar evento"}
        </button>
      </form>
    </div>
  );
};
