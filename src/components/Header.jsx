import { logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="w-full bg-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">LawMate</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </header>
  );
}
