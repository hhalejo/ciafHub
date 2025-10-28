import { CalendarIcon, MapPinIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Event } from "../../types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

interface EventCardProps {
  event: Event;
  onClick?: () => void;
  onDelete: (id: string) => void;
  currentUserId: string; // 👈 id del usuario actual
}

export function EventCard({ event, onDelete, onClick, currentUserId }: EventCardProps) {
  const eventDate = new Date(event.date);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(event.id);
    setShowConfirm(false);
  };

  const isOwner = String(event.user_id) === String(currentUserId);// ✅ validación del dueño

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6 border border-gray-200 relative"
    >
      {/* Botón eliminar solo si es dueño */}
      {isOwner && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirm(true);
          }}
          className="absolute bottom-2 right-2 text-red-500 hover:text-red-700"
          title="Eliminar evento"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      )}

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar eliminación
            </h3>
            <p className="text-sm text-gray-700 mb-6">
              ¿Estás seguro de que deseas eliminar el evento "{event.title}"?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
          {event.title}
        </h3>
        <div className="text-center bg-blue-50 rounded-lg p-2 min-w-[60px]">
          <div className="text-xs text-blue-600 font-medium uppercase">
            {format(eventDate, "MMM", { locale: es })}
          </div>
          <div className="text-lg font-bold text-blue-800">
            {format(eventDate, "dd")}
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {event.description}
      </p>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <CalendarIcon className="h-4 w-4" />
          <span>{format(eventDate, "EEEE, dd MMMM yyyy", { locale: es })}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPinIcon className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Por: <strong>{event.user.full_name}</strong>
        </span>
      </div>
    </div>
  );
}
