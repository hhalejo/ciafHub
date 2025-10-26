import React, { useState } from "react";
import { supabase } from "../../lib/supabase"; 

type OpportunityType =
  | "empleo"
  | "practica"
  | "voluntariado"
  | "programa";

export const CreateOpportunityForm: React.FC<{ onCreated?: () => void }> = ({ onCreated }) => {
  const [type, setType] = useState<OpportunityType>("empleo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [duration, setDuration] = useState("");
  const [benefits, setBenefits] = useState("");
  const [applyLink, setApplyLink] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const newOpportunity = {
      type,
      title,
      description,
      requirements,
      duration: type === "practica" ? duration : null,
      benefits,
    
    };

    const { error } = await supabase.from("oportunidades").insert([newOpportunity]);

    if (error) {
      console.error("❌ Error al crear oportunidad:", error.message);
      setMessage("❌ Error al crear la oportunidad. Verifica los permisos o la conexión.");
    } else {
      setMessage("✅ Oportunidad creada con éxito!");
      setType("empleo");
      setTitle("");
      setDescription("");
      setRequirements("");
      setDuration("");
      setBenefits("");
      setApplyLink("");
      onCreated?.();
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-xl mx-auto border border-gray-200"
    >
      <h2 className="text-xl font-bold text-gray-800 text-center">
        Crear Nueva Oportunidad
      </h2>

      {/* Tipo de oportunidad */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Tipo de oportunidad
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as OpportunityType)}
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
        >
          <option value="empleo">Empleo</option>
          <option value="practica">Prácticas / Pasantías</option>
          <option value="voluntariado">Voluntariado / Proyectos</option>
          <option value="programa">Otros programas de desarrollo</option>
        </select>
      </div>

      {/* Título */}
      <div>
        <label className="block text-sm font-medium mb-1">Título de la oferta</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Desarrollador Frontend Junior"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
          required
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Explica el cargo, funciones o proyecto..."
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
          rows={3}
          required
        />
      </div>

      {/* Requisitos */}
      <div>
        <label className="block text-sm font-medium mb-1">Requisitos / Perfil solicitado</label>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Ej: Estudiantes de últimos semestres de ingeniería..."
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
          rows={2}
        />
      </div>

      {/* Duración (solo prácticas) */}
      {type === "practica" && (
        <div>
          <label className="block text-sm font-medium mb-1">Duración</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Ej: 6 meses"
            className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
          />
        </div>
      )}

      {/* Beneficios */}
      <div>
        <label className="block text-sm font-medium mb-1">Beneficios</label>
        <textarea
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          placeholder="Ej: Salario, apoyo económico, certificación..."
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
          rows={2}
        />
      </div>

      {/* Link de postulación */}
      <div>
        <label className="block text-sm font-medium mb-1">Link de postulación</label>
        <input
          type="url"
          value={applyLink}
          onChange={(e) => setApplyLink(e.target.value)}
          placeholder="Ej: https://ciafhub.com/postulate"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full ${
          loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
        } text-white px-4 py-2 rounded-lg transition`}
      >
        {loading ? "Creando..." : "Crear Oportunidad"}
      </button>

      {/* Mensaje */}
      {message && (
        <p
          className={`text-sm text-center mt-2 ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};
