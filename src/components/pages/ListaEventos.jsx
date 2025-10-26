import React, { useState } from "react";

const ListaEventos = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [eventos, setEventos] = useState([]);

  const [nuevoEvento, setNuevoEvento] = useState({
    titulo: "",
    categoria: "",
    descripcion: "",
    fecha: "",
    modalidad: "Presencial",
    cupos: "",
    certificado: false,
    streaming: false,
  });

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoEvento({
      ...nuevoEvento,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEventos([...eventos, nuevoEvento]);
    setNuevoEvento({
      titulo: "",
      categoria: "",
      descripcion: "",
      fecha: "",
      modalidad: "Presencial",
      cupos: "",
      certificado: false,
      streaming: false,
    });
    setMostrarFormulario(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Eventos</h2>

      <button
        onClick={toggleFormulario}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {mostrarFormulario ? "Cancelar" : "Crear Evento"}
      </button>

      {mostrarFormulario && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded shadow mb-4"
        >
          <input
            type="text"
            name="titulo"
            placeholder="Título del evento"
            value={nuevoEvento.titulo}
            onChange={handleChange}
            className="block w-full p-2 mb-2 border rounded"
            required
          />

          <select
            name="categoria"
            value={nuevoEvento.categoria}
            onChange={handleChange}
            className="block w-full p-2 mb-2 border rounded"
            required
          >
            <option value="">Selecciona una categoría</option>
            <option>Eventos Académicos</option>
            <option>Formación y Capacitación</option>
            <option>Integración y Comunidad</option>
            <option>Vinculación Externa</option>
            <option>Culturales y Bienestar</option>
          </select>

          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={nuevoEvento.descripcion}
            onChange={handleChange}
            className="block w-full p-2 mb-2 border rounded"
          />

          <input
            type="date"
            name="fecha"
            value={nuevoEvento.fecha}
            onChange={handleChange}
            className="block w-full p-2 mb-2 border rounded"
            required
          />

          <select
            name="modalidad"
            value={nuevoEvento.modalidad}
            onChange={handleChange}
            className="block w-full p-2 mb-2 border rounded"
          >
            <option>Presencial</option>
            <option>Virtual</option>
            <option>Híbrido</option>
          </select>

          <input
            type="number"
            name="cupos"
            placeholder="Cupos disponibles"
            value={nuevoEvento.cupos}
            onChange={handleChange}
            className="block w-full p-2 mb-2 border rounded"
          />

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              name="certificado"
              checked={nuevoEvento.certificado}
              onChange={handleChange}
              className="mr-2"
            />
            ¿Genera certificado?
          </label>

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              name="streaming"
              checked={nuevoEvento.streaming}
              onChange={handleChange}
              className="mr-2"
            />
            ¿Disponible en streaming?
          </label>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Guardar Evento
          </button>
        </form>
      )}

      {/* Listado de eventos creados */}
      <ul>
        {eventos.map((evento, index) => (
          <li key={index} className="border-b py-2">
            <strong>{evento.titulo}</strong> - {evento.categoria} <br />
            📅 {evento.fecha} | 🎓 {evento.modalidad} | 👥 {evento.cupos} cupos
            <br />
            {evento.certificado && "🏅 Certificado disponible"}
            {evento.streaming && " | 🌐 Streaming habilitado"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEventos;
