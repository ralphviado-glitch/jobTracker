// src/pages/EditJob.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { apiRequest } from "../services/api";

export default function EditJob() {
  const { id } = useParams(); // Job ID from URL
  const navigate = useNavigate();
  const location = useLocation();

  const [job, setJob] = useState({
    company: "",
    position: "",
    status: "Applied",
    notes: "",
    followUpDate: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job details from backend
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await apiRequest(`/jobs/${id}`, "GET");
        setJob({
          ...data,
          followUpDate: data.followUpDate
            ? new Date(data.followUpDate).toISOString().split("T")[0]
            : ""
        });
      } catch (err) {
        setError("Failed to load job data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // Submit edited job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest(`/jobs/${id}`, "PUT", job);
      navigate("/dashboard"); // go back to dashboard
    } catch (err) {
      alert("Failed to update job: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container p-4" style={{ maxWidth: "600px" }}>
      <h1 className="mb-4">Edit Job Application</h1>

      <form onSubmit={handleSubmit}>
        {/* Company */}
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            name="company"
            value={job.company}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Position */}
        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            type="text"
            name="position"
            value={job.position}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={job.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Follow-up Date */}
        <div className="mb-3">
          <label className="form-label">Follow-up Date</label>
          <input
            type="date"
            name="followUpDate"
            value={job.followUpDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Notes */}
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            name="notes"
            value={job.notes}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
}
