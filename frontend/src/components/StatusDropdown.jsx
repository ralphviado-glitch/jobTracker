import { useState } from "react";
import { apiRequest } from "../services/api";

export default function StatusDropdown({ job, onUpdate }) {
  const [status, setStatus] = useState(job.status);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus); // optimistic update
    setLoading(true);

    try {
      await apiRequest(`/jobs/${job._id}`, "PUT", { ...job, status: newStatus });
      onUpdate(newStatus);   // notify parent (Dashboard)
    } catch (err) {
      alert("Failed to update status: " + err.message);
      setStatus(job.status); // revert to original on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      className="form-select form-select-sm"
      style={{ maxWidth: "150px" }}
    >
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Offer">Offer</option>
      <option value="Rejected">Rejected</option>
    </select>
  );
}
