import { useState, useEffect } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(stored);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📅 Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments booked yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((a, i) => (
            <div
              key={i}
              className="bg-white shadow-md p-4 rounded-lg border hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">
                👤 {a.clientName} <span className="text-sm text-gray-500">(Client)</span>
              </h3>
              <p className="text-sm text-gray-500">  {a.clientEmail}</p>
              <p className="text-sm text-gray-500">  {a.clientPhone}</p>
              <p className="text-sm text-gray-500">  {a.clientLocation}</p>
              <p className="text-sm text-gray-500">📝 Case: {a.caseDetails}</p>
              <p className="text-sm text-gray-500">📅 Date: {a.appointmentDate}</p>

              <hr className="my-3" />

              <h4 className="font-semibold">👨‍⚖️ Lawyer Info</h4>
              <p className="text-sm text-gray-600">{a.lawyer?.name}</p>
              <p className="text-sm text-gray-500">  {a.lawyer?.email}</p>
              <p className="text-sm text-gray-500">  {a.lawyer?.phone}</p>
              <p className="text-sm text-gray-500">  {a.lawyer?.location}</p>
              <p className="text-sm text-gray-500">
                {a.lawyer?.experience} yrs · {a.lawyer?.type}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
