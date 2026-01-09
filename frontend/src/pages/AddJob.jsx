import { useState } from "react";
import { apiRequest } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiRequest("/jobs", "POST", form);
      navigate("/dashboard"); // redirect after success
    } catch (err) {
      alert(err.message || "Failed to add job");
    }
  };

  return (
    <div className="container p-4" style={{ maxWidth: "600px" }}>
      <h1 className="mb-4">Add Job</h1>

      <form onSubmit={handleSubmit}>
        {/* Company input */}
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        {/* Position input */}
        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            name="position"
            placeholder="Position"
            value={form.position}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        {/* Status select */}
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Notes textarea */}
        <div className="mb-3">
          <label className="form-label">Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary w-100">
          Add Job
        </button>
      </form>
    </div>
  );
}
