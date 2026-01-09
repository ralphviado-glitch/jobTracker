import { useState } from "react";
import { apiRequest } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiRequest("/auth/login", "POST", form);
    localStorage.setItem("token", data.token);
    window.location.href = "/status-overview";
  };

  return (
    // Full-height container to center content vertically
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="text-center mb-4">Login</h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>


        <p className="text-center mt-3 mb-0">
          Demo Account
          Email: ralph.viado@gmail.com
          | Password: Ralph1234!
          [ Login as Demo ]</p>
{/*        <p className="text-center mt-3 mb-0">
          Don’t have an account? <a href="/register">Register here</a> 
        </p>*/}
      </div>
    </div>
  );
}
