import React, { useState } from "react";
import api from "../api/axios.js";
import {useNavigate} from "react-router-dom"
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== conPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await api.post("/auth/register", { email, password });
      localStorage.setItem("token", res.data.data.token);
      alert("Registration Successful!");
      navigate("/");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Registration failed"));
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-10">
          <h1
            className="text-4xl font-black tracking-tight"
            style={{ color: "#2563eb" }}
          >
            TaskFlow
          </h1>
          <p className="text-gray-500 mt-2">Manage your tasks efficiently</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-700 text-sm font-bold mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-bold mb-2 block">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-bold mb-2 block">
              Confirm Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              placeholder="Confirm Password"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
            />
          </div>

          {/* --- BUTTON SECTION --- */}
          <div className="mt-8">
            <button
              type="submit"
              style={{
                backgroundColor: "#2563eb", // Royal Blue
                color: "#ffffff", // Pure White Text
                padding: "14px 0px",
                width: "100%",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                border: "none",
                display: "block",
                boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.4)"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
            >
              CREATE MY ACCOUNT
            </button>
          </div>
          {/* --------------------- */}

          <p className="text-gray-600 text-sm mt-6 text-center">
            Already have an account?{" "}
            <a href="/login" className="font-bold" style={{ color: "#2563eb" }}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
