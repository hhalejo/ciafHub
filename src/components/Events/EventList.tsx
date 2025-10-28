import { Event } from "../../types";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  onDelete: (id: string) => void;
  currentUserId: string; // 👈 id del usuario actual
}

export function EventList({ events, onSelectEvent, onDelete, currentUserId }: EventListProps) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onSelectEvent(event)}
          onDelete={onDelete}
          currentUserId={currentUserId} // 👈 pasa al EventCard
        />
      ))}
    </div>
  );
}