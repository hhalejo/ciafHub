// src/components/Services/ServiceCard.tsx
import React, { useState } from "react";
import { TrashIcon, StarIcon } from "@heroicons/react/24/solid";
import { format, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { Service } from "../../types";
import { useAuth } from "../../hooks/useAuth"; // 👈 importa el hook de autenticación

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  onDelete: (id: string) => void;
  onContact: (receiverId: string) => void;
}

export function ServiceCard({ service, onClick, onDelete, onContact }: ServiceCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { user } = useAuth(); // 👈 obtiene el usuario logueado

  // Fecha segura
  let dateText = "";
  if (service.created_at) {
    const d = new Date(service.created_at);
    if (isValid(d)) dateText = format(d, "dd MMM", { locale: es });
  }

  // Nombre usuario seguro
  const userName =
    // @ts-ignore
    service.user?.nombre ?? service.user?.full_name ?? "Usuario";

  // 👇 condición: solo mostrar el TrashIcon si el usuario actual creó el servicio
  const isOwner = user && service.user_id === user.id;

  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6 border border-gray-200"
    >
      {/* Botón eliminar (solo si es del usuario actual) */}
      {isOwner && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirm(true);
          }}
          className="absolute bottom-2 right-2 text-red-500 hover:text-red-700"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      )}

      {/* Botón contactar */}
      {!isOwner && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onContact(service.user_id);
          }}
          className="absolute bottom-2 left-6 text-blue-600 hover:text-blue-800"
        >
          Contactar
        </button>
      )}

      {/* Modal confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              ¿Eliminar servicio?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  onDelete(service.id);
                  setShowConfirm(false);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
          {service.title}
        </h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {service.category}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {service.average_rating ?? "Sin calificar"}
            </span>
          </div>

          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">{userName}</span>
        </div>

        <span className="text-xs text-gray-500">{dateText}</span>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-600">
          <strong>Disponibilidad:</strong> {service.availability ?? "Disponible"}
        </span>
      </div>
    </div>
  );
}
