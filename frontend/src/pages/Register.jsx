import { useState } from "react";
import { apiRequest } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiRequest("/auth/register", "POST", form);
    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="container p-4" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            onChange={e => setForm({ ...form, email: e.target.value })}
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
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}
