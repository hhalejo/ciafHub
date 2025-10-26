import React, { useState } from "react";
import { CreateServiceForm } from "../Create/CreateServiceForm";
import { CreateEventForm } from "../Create/CreateEventForm";
import { CreateOpportunityForm } from "../Create/CreateOpportunityForm";
import { CreateAnnouncementForm } from "../Create/CreateAnnouncementForm";


export const CreatePage: React.FC = () => {
  const [type, setType] = useState("");

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Crear contenido
      </h1>

      {/* Selector de tipo */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona qué deseas crear:
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
        >
          <option value="">-- Selecciona una opción --</option>
          <option value="service">📖 Servicio</option>
          <option value="event">📅 Evento</option>
          <option value="opportunity">💼 Oportunidad</option>
          <option value="announcement">📢 Anuncio</option>
        </select>
      </div>

      {/* Formulario dinámico */}
      {type === "service" && <CreateServiceForm />}
      {type === "event" && <CreateEventForm />}
      {type === "opportunity" && <CreateOpportunityForm/>}
      {type === "announcement" && <CreateAnnouncementForm/>}
    </div>
  );
};
