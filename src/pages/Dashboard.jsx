import { useState } from "react";
import emailjs from "emailjs-com";

export default function Dashboard() {
  const [lawyers, setLawyers] = useState(
    (JSON.parse(localStorage.getItem("lawyers") || "[]")).map((l) => ({
      location: "",
      ...l,
    }))
  );
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    freeDates: "",
    type: "",
    experience: "",
    location: "",
  });

  const [appointmentData, setAppointmentData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientLocation: "",
    caseDetails: "",
    appointmentDate: "",
  });

  const saveLawyers = (list) => {
    setLawyers(list);
    localStorage.setItem("lawyers", JSON.stringify(list));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and Email are required!");
      return;
    }
    const updated = [...lawyers, formData];
    saveLawyers(updated);
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      freeDates: "",
      type: "",
      experience: "",
      location: "",
    });
  };

  // EmailJS function
  const sendEmailToLawyer = (lawyerEmail, appointmentData) => {
    const templateParams = {
      to_email: lawyerEmail,
      client_name: appointmentData.clientName,
      client_email: appointmentData.clientEmail,
      client_phone: appointmentData.clientPhone,
      client_location: appointmentData.clientLocation,
      case_details: appointmentData.caseDetails,
      appointment_date: appointmentData.appointmentDate,
    };

    emailjs.send(
      "service_bd5i3cv",
      "template_a976mvn",
      templateParams,
      "mzJirHcE81G7qeFCE"
    ).then(
      (response) => {
        console.log("Email sent successfully!", response.status, response.text);
      },
      (err) => {
        console.error("Failed to send email:", err);
      }
    );
  };

  const saveAppointment = (e) => {
    e.preventDefault();
    if (!appointmentData.clientName || !appointmentData.clientEmail) {
      alert("Client Name and Email are required!");
      return;
    }

    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const newAppointment = { ...appointmentData, lawyer: selectedLawyer };
    localStorage.setItem("appointments", JSON.stringify([...appointments, newAppointment]));

    const clients = JSON.parse(localStorage.getItem("clients") || "[]");
    const newClient = {
      name: appointmentData.clientName,
      email: appointmentData.clientEmail,
      phone: appointmentData.clientPhone,
      location: appointmentData.clientLocation,
      caseDetails: appointmentData.caseDetails,
    };
    const updatedClients = [...clients.filter((c) => c.email !== newClient.email), newClient];
    localStorage.setItem("clients", JSON.stringify(updatedClients));

    // ✅ Send email to lawyer
    sendEmailToLawyer(selectedLawyer.email, newAppointment);

    alert("✅ Appointment booked successfully!");
    setShowAppointmentForm(false);
    setAppointmentData({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      clientLocation: "",
      caseDetails: "",
      appointmentDate: "",
    });
  };

  const uniqueLocations = [...new Set(lawyers.map((l) => l.location).filter((loc) => loc !== ""))];

  const filtered = search
    ? lawyers.filter((l) => l.location && l.location.toLowerCase().includes(search.toLowerCase()))
    : [];

  const bgStyle = {
    width: "100%",
    minHeight: "100vh",
    backgroundImage:
      'url("https://as1.ftcdn.net/v2/jpg/05/73/34/02/1000_F_573340270_dxzNvPan30gMk6YsHiYvR9JnX87ulIzc.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "2rem",
  };

  return (
    <div style={bgStyle}>
      <h2 className="text-2xl font-bold mb-6 text-black">🏛️ Dashboard</h2>

      {/* Search + Register */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="🔍 Enter Location (e.g. Delhi)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />

        <select
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Register Lawyer 💼
        </button>
      </div>

      {/* Conditional Rendering */}
      {search === "" ? (
        <p className="text-gray-200">🔎 Search a location to see available lawyers.</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-200">No lawyers found for "{search}".</p>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((l, i) => (
            <li
              key={i}
              className="bg-white shadow-md p-4 rounded-lg border hover:shadow-xl transition"
            >
              <h3 className="font-bold text-lg">{l.name}</h3>
              <p className="text-gray-600">{l.type} Lawyer</p>
              <p className="text-sm text-gray-500">  {l.email}</p>
              <p className="text-sm text-gray-500">  {l.phone}</p>
              <p className="text-sm text-gray-500">  {l.freeDates}</p>
              <p className="text-sm text-gray-500">  {l.experience} years experience</p>
              <p className="text-sm text-gray-500"> {l.location}</p>
              <button
                onClick={() => {
                  setSelectedLawyer(l);
                  setShowAppointmentForm(true);
                }}
                className="mt-3 w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
              >
                📅 Book Appointment
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal Form: Register Lawyer */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">➕ Register Lawyer 💼</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Available Dates"
                value={formData.freeDates}
                onChange={(e) => setFormData({ ...formData, freeDates: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Type of Lawyer"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Experience in years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Form: Book Appointment */}
      {showAppointmentForm && selectedLawyer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">
              📅 Book Appointment with {selectedLawyer.name}
            </h3>
            <form onSubmit={saveAppointment} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={appointmentData.clientName}
                onChange={(e) => setAppointmentData({ ...appointmentData, clientName: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={appointmentData.clientEmail}
                onChange={(e) => setAppointmentData({ ...appointmentData, clientEmail: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Your Phone Number"
                value={appointmentData.clientPhone}
                onChange={(e) => setAppointmentData({ ...appointmentData, clientPhone: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Your Location"
                value={appointmentData.clientLocation}
                onChange={(e) => setAppointmentData({ ...appointmentData, clientLocation: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="Case Details"
                value={appointmentData.caseDetails}
                onChange={(e) => setAppointmentData({ ...appointmentData, caseDetails: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                value={appointmentData.appointmentDate}
                onChange={(e) => setAppointmentData({ ...appointmentData, appointmentDate: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowAppointmentForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
