import { useState, useEffect } from "react";

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("clients") || "[]");
    setClients(stored);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">👥 Clients</h2>

      {clients.length === 0 ? (
        <p className="text-gray-500">No clients found yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((c, i) => (
            <div
              key={i}
              className="bg-white shadow-md p-4 rounded-lg border hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">{c.name}</h3>
              <p className="text-sm text-gray-500">  {c.email}</p>
              <p className="text-sm text-gray-500">  {c.phone}</p>
              <p className="text-sm text-gray-500">  {c.location}</p>
              <p className="text-sm text-gray-500">  {c.caseDetails}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
