// src/components/events/EventCalendar.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Event } from "../../types";
import { EventList } from "./EventList";

export function EventCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;

      if (data) {
        // transformar datos si es necesario
        const mappedEvents: Event[] = data.map((e: any) => ({
          id: e.id,
          title: e.title,
          description: e.description,
          date: e.date,
          location: e.location,
          user_id: e.user_id,
          user: {
            full_name: e.user_name || "Anónimo", // ajusta según tu DB
          },
          created_at: e.created_at,
        }));

        setEvents(mappedEvents);
      }
    } catch (err) {
      console.error("Error al obtener eventos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();

    // opcional: suscripción en tiempo real
    const subscription = supabase
      .channel("public:eventos")
      .on("postgres_changes", { event: "*", schema: "public", table: "eventos" }, () => {
        fetchEvents();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Calendario Académico</h2>

      {loading ? (
        <div className="text-gray-500 py-10 text-center">Cargando eventos...</div>
      ) : (
        <EventList events={events} onSelectEvent={setSelectedEvent} />
      )}

      {selectedEvent && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-lg text-blue-900">
            {selectedEvent.title}
          </h3>
          <p className="text-sm text-gray-700 mt-2">{selectedEvent.description}</p>
          <p className="text-xs text-gray-500 mt-1">
            Fecha: {new Date(selectedEvent.date).toLocaleDateString("es-ES")}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Ubicación: {selectedEvent.location}
          </p>
        </div>
      )}
    </div>
  );
}
