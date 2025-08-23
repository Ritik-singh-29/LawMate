import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const GOOGLE_CLIENT_ID = "261216191872-dftuevnt42sfos66vtae4o6n0gh21jgg.apps.googleusercontent.com";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = getUser();
    if (user && user.email === form.email && user.password === form.password) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  // Handle Google Login
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("googleLoginBtn"),
      { theme: "outline", size: "large", width: "100%" }
    );
  }, []);

  const handleGoogleResponse = (response) => {
    const profile = JSON.parse(atob(response.credential.split(".")[1]));
    const googleUser = getUser() || {};
    if (profile.email === googleUser.email) {
      alert("Login with Google successful!");
      navigate("/dashboard");
    } else {
      alert("Google account not registered. Please signup first.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded-xl shadow-md w-96 space-y-3" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
        <div className="text-center my-2">OR</div>
        <div id="googleLoginBtn"></div>
      </form>
    </div>
  );
}
