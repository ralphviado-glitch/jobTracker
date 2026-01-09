import { useState } from "react";
import { apiRequest } from "../services/api";

export default function JobFormModal({ job, onClose }) {
  const [form, setForm] = useState({
    company: job?.company || "",
    position: job?.position || "",
    status: job?.status || "Applied",
    notes: job?.notes || ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (job) {
        await apiRequest(`/jobs/${job._id}`, "PUT", form);
      } else {
        await apiRequest("/jobs", "POST", form);
      }
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>{job ? "Edit Job" : "Add Job"}</h2>
        <input 
          placeholder="Company" 
          value={form.company} 
          onChange={e => setForm({...form, company: e.target.value})} 
          required 
        />
        <input 
          placeholder="Position" 
          value={form.position} 
          onChange={e => setForm({...form, position: e.target.value})} 
          required 
        />
        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <textarea 
          placeholder="Notes" 
          value={form.notes} 
          onChange={e => setForm({...form, notes: e.target.value})}
        />
        <button type="submit">{job ? "Update" : "Add"}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
