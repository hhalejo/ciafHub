import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

export const CreateServiceForm: React.FC = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const categories: Record<string, string[]> = {
    "📖 Servicios de apoyo al estudio": [
      "Tutorías personalizadas",
      "Preparación para parciales/exámenes",
      "Resolución de dudas rápidas",
      "Asesoría en proyectos o trabajos de grado",
      "Traducción y corrección de textos",
    ],
    "✍️ Servicios de producción académica": [
      "Redacción de resúmenes/guías",
      "Apoyo en presentaciones",
      "Revisión de ortografía y estilo",
      "Diagramación de documentos (APA, IEEE, etc.)",
    ],
    "👨‍💻 Servicios digitales / tecnológicos": [
      "Asesoría en software académico (Excel, AutoCAD, etc.)",
      "Clases de programación o bases de datos",
      "Creación de infografías/mapas conceptuales",
      "Edición de videos o podcasts",
    ],
    "👥 Servicios colaborativos": [
      "Grupos de estudio por asignatura",
      "Mentorías entre semestres",
      "Intercambio de notas/apuntes",
    ],
    "🌍 Servicios con enfoque práctico": [
      "Prácticas de idiomas entre pares",
      "Preparación para exposiciones",
      "Simulacros de entrevistas",
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("services").insert([
      {
        user_id: user?.id,
        category,
        subcategory,
        title,
        description,
        price,
      },
    ]);

    if (error) {
      console.error(error);
      alert("❌ Error al guardar el servicio");
    } else {
      alert("✅ Servicio creado con éxito");
      setCategory("");
      setSubcategory("");
      setTitle("");
      setDescription("");
      setPrice("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Crear un nuevo servicio
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
              <option value="">Selecciona un servicio específico</option>
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
            Título del servicio
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Tutorías de matemáticas para primer semestre"
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
            placeholder="Explica brevemente en qué consiste tu servicio"
            rows={4}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio aproximado (opcional)
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ej: $20.000 por hora"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Publicar servicio
        </button>
      </form>
    </div>
  );
};
