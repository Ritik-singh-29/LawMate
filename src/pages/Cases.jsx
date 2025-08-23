import { useState, useEffect } from "react";

export default function Cases() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Get all appointments from localStorage
    const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(storedAppointments);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📂 Cases Overview</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No cases recorded yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((a, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded-lg border hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">👤 {a.clientName}</h3>
              
              <p className="text-sm text-gray-500">📝 Case Details: {a.caseDetails}</p>
             

              <hr className="my-3" />

             
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
