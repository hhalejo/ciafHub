// src/components/events/EventList.tsx
import { Event } from "../../types";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
}

export function EventList({ events, onSelectEvent, onDeleteEvent }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No hay eventos académicos programados 📅
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onSelectEvent(event)}
          onDelete={onDeleteEvent}
        />
      ))}
    </div>
  );
}
