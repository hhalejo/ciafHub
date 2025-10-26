import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { ServiceCard } from "./ServiceCard";
import ChatModal from "./ChatModal"; // 👈 importa el modal

type Service = {
  id: string;
  user_id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  price?: string;
  created_at?: string;
};

export const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // 👇 para el chat
  const [chatReceiver, setChatReceiver] = useState<string | null>(null);
  const [chatService, setChatService] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setServices(data || []);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  if (loading) {
    return <p className="text-gray-500">Cargando servicios...</p>;
  }

  if (services.length === 0) {
    return <p className="text-gray-600">No hay servicios publicados aún.</p>;
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={{
              ...service,
              profiles: { full_name: "Usuario demo" },
              average_rating: 0,
              availability: "Disponible",
            }}
            onClick={() => console.log("Click en servicio", service.id)}
            onDelete={handleDelete}
            onContact={(receiverId) => {
              setChatReceiver(receiverId);
              setChatService(service.id);
            }}
          />
        ))}
      </div>

      {/* 👇 Mostrar modal de chat si hay chatReceiver */}
      {chatReceiver && chatService && (
        <ChatModal
          receiverId={chatReceiver}
          serviceId={chatService}
          onClose={() => {
            setChatReceiver(null);
            setChatService(null);
          }}
        />
      )}
    </>
  );
};
