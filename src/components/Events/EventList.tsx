import { TrashIcon } from "@heroicons/react/24/outline";
import { Event } from "../../types";

interface EventListProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  onDelete: (id: string) => void;
  currentUserId: string; // 👈 viene de EventCalendar
}

export function EventList({ events, onSelectEvent, onDelete, currentUserId }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-gray-500 py-10 text-center">
        No hay eventos disponibles.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {events.map((event) => (
        <li
          key={event.id}
          className="flex justify-between items-start bg-white p-4 rounded-lg shadow border border-gray-200"
        >
          <div onClick={() => onSelectEvent(event)} className="cursor-pointer flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
            <p className="text-sm text-gray-700">{event.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              Fecha: {new Date(event.date).toLocaleDateString("es-ES")}
            </p>
            <p className="text-xs text-gray-500 mt-1">Ubicación: {event.location}</p>
            <p className="text-xs text-gray-400 mt-1">
              Publicado por: {event.user?.full_name || "Anónimo"}
            </p>
          </div>

          {/* 🗑️ Mostrar solo si el evento es del usuario actual */}
          {event.user_id === currentUserId && (
            <button
              onClick={() => onDelete(event.id)}
              className="ml-4 text-red-500 hover:text-red-700"
              title="Eliminar evento"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
