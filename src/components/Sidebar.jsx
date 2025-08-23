import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold p-6">LawMate</h1>
      <nav className="flex-1 px-4">
        <ul className="space-y-4">
          <li><Link to="/dashboard" className="block">Dashboard</Link></li>
          <li><Link to="/clients" className="block">Clients</Link></li>
          <li><Link to="/cases" className="block">Cases</Link></li>
          <li><Link to="/appointments" className="block">Appointments</Link></li>
          <li><Link to="/lawyers" className="block">Lawyers</Link></li>
        </ul>
      </nav>
      <div className="p-4 bg-gray-800 text-center">
        <Link to="/ritron">Ritron AI</Link>
      </div>
    </div>
  );
}
