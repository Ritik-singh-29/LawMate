import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utils/auth";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const GOOGLE_CLIENT_ID = "261216191872-dftuevnt42sfos66vtae4o6n0gh21jgg.apps.googleusercontent.com";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(form);
    alert("Signup successful! Please login.");
    navigate("/login");
  };

  // Handle Google Signup
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("googleSignUpBtn"),
      { theme: "outline", size: "large", width: "100%" }
    );
  }, []);

  const handleGoogleResponse = (response) => {
    const profile = JSON.parse(atob(response.credential.split(".")[1]));
    const googleUser = {
      name: profile.name,
      email: profile.email,
      password: "", // optional: you can generate a random password
    };
    saveUser(googleUser);
    alert("Signup with Google successful!");
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96 space-y-3"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
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
          Register
        </button>
        <div className="text-center my-2">OR</div>
        <div id="googleSignUpBtn"></div>
      </form>
    </div>
  );
}
