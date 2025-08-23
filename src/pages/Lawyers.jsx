import { useState, useEffect } from "react";

export default function Lawyers() {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("lawyers") || "[]");
    setLawyers(stored);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">👨‍⚖️ Registered Lawyers</h2>
      {lawyers.length === 0 ? (
        <p className="text-gray-500">No lawyers registered yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lawyers.map((l, i) => (
            <div
              key={i}
              className="bg-white shadow-md p-4 rounded-lg border hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">{l.name}</h3>
              <p className="text-gray-600">{l.type} Lawyer</p>
              <p className="text-sm text-gray-500">  {l.email}</p>
              <p className="text-sm text-gray-500">  {l.phone}</p>
              <p className="text-sm text-gray-500">  {l.freeDates}</p>
              <p className="text-sm text-gray-500">
                🧑‍💼 {l.experience} years experience
              </p>
              <p className="text-sm text-gray-500">  {l.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
