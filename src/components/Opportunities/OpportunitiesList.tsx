import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";

// Definimos la interfaz de cada oportunidad
interface Opportunity {
  id: string;
  title: string;
  type?: string;
  description?: string;
  requirements?: string;
  duration?: string;
  benefits?: string;
  applyLink?: string;
}

export const OpportunitiesList: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from<"oportunidades", Opportunity>("oportunidades")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setOpportunities(data ?? []);
    } catch (err: any) {
      console.error("Error al obtener oportunidades:", err.message || err);
      setError("No se pudieron cargar las oportunidades.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      await fetchOpportunities();
    };

    if (isMounted) loadData();

    return () => {
      isMounted = false;
    };
  }, [fetchOpportunities]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-4">{error}</div>;
  }

  if (opportunities.length === 0) {
    return (
      <div className="text-center text-gray-600 py-6">
        No hay oportunidades publicadas aún.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((op) => (
        <section
          key={op.id}
          className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
        >
          <div className="text-lg font-bold text-gray-800">{op.title}</div>
          {op.type && (
            <div className="text-sm text-blue-600 font-medium capitalize mb-2">
              {op.type}
            </div>
          )}
          {op.description && (
            <div className="text-gray-700 text-sm mb-3 line-clamp-3">
              {op.description}
            </div>
          )}
          {op.requirements && (
            <div className="text-gray-600 text-xs mb-2">
              <span className="font-medium">Requisitos:</span> {op.requirements}
            </div>
          )}
          {op.duration && (
            <div className="text-gray-600 text-xs mb-2">
              <span className="font-medium">Duración:</span> {op.duration}
            </div>
          )}
          {op.benefits && (
            <div className="text-gray-600 text-xs mb-3">
              <span className="font-medium">Beneficios:</span> {op.benefits}
            </div>
          )}
          {op.applyLink && (
            <a
              href={op.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white text-sm px-3 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Postular
            </a>
          )}
        </section>
      ))}
    </div>
  );
};
