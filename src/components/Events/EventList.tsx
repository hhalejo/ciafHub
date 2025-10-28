import React from "react";
import { EventCard } from "./EventCard";
import { Event } from "../../types";

interface EventListProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  onDelete: (id: string) => void;
}

export function EventList({ events, onSelectEvent, onDelete }: EventListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onSelectEvent(event)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
