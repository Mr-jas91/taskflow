import React, { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(""); // ⚠️ use email, not username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      const token = res.data?.data?.token || res.data?.token;

      if (!token) {
        throw new Error("Token not received");
      }

      localStorage.setItem("token", token);

      navigate("/", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-2xl">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl font-black tracking-tight"
            style={{ color: "#2563eb" }}
          >
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">Sign in to continue</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="text-gray-700 text-sm font-bold mb-2 block">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-gray-700 text-sm font-bold mb-2 block">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            />
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>

            <a href="#" className="font-semibold" style={{ color: "#2563eb" }}>
              Forgot password?
            </a>
          </div>

          {/* BUTTON */}
          <div className="mt-6">
            <button
              type="submit"
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
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
              SIGN IN
            </button>
          </div>

          {/* FOOTER */}
          <p className="text-gray-600 text-sm mt-6 text-center">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-bold"
              style={{ color: "#2563eb" }}
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
