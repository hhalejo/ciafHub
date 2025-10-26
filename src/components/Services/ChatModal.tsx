// src/components/Services/ChatModal.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

interface ChatModalProps {
  receiverId: string; // dueño del servicio
  serviceId: string;
  onClose: () => void;
}

export default function ChatModal({ receiverId, serviceId, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("service_id", serviceId)
        .order("created_at", { ascending: true });
      setMessages(data || []);
    };

    loadMessages();

    // Suscripción realtime
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `service_id=eq.${serviceId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serviceId]);

  const sendMessage = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("messages").insert({
      sender_id: user.id,
      receiver_id: receiverId,
      service_id: serviceId,
      content: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Chat con proveedor</h2>
        <div className="h-64 overflow-y-auto border rounded p-2 mb-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-2 my-1 rounded ${
                m.sender_id === receiverId ? "bg-gray-100 text-left" : "bg-blue-100 text-right"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded px-2"
            placeholder="Escribe un mensaje..."
          />
          <button onClick={sendMessage} className="ml-2 bg-blue-600 text-white px-3 rounded">
            Enviar
          </button>
        </div>
        <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:text-gray-700">
          Cerrar
        </button>
      </div>
    </div>
  );
}
