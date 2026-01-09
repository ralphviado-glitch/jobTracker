import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import StatusCard from "../components/StatusCard";
import JobCard from "../components/JobCard";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const data = await apiRequest("/jobs", "GET");
      setJobs(data);
    } catch (err) {
      setError("Failed to load job applications. Please try again.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const handleStatusChange = (id, newStatus) => {
    setJobs(prev => prev.map(job => job._id === id ? { ...job, status: newStatus } : job));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await apiRequest(`/jobs/${id}`, "DELETE");
      setJobs(prev => prev.filter(job => job._id !== id));
    } catch (err) {
      alert("Failed to delete job: " + err.message);
    }
  };

  const handleEdit = (job) => navigate(`/edit-job/${job._id}`);

  const filteredJobs = jobs
    .filter(job => filter === "All" ? true : job.status === filter)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3">Job Applications</h1>
        <Link to="/add-job" className="btn btn-success">
          + Add Job
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="row mb-4">
        {["Applied","Interview","Offer","Rejected"].map(status => (
          <div key={status} className="col-md-3 mb-3">
            <StatusCard title={status} count={statusCounts[status] || 0} />
          </div>
        ))}
      </div>

      <div className="mb-3 d-flex align-items-center gap-2">
        <label className="mb-0 fw-medium">Filter:</label>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="form-select w-auto"
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="border p-4 text-center text-muted rounded">
          <p>No job applications found.</p>
          <p>Click <strong>Add Job</strong> to create your first application.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {filteredJobs.map(job => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={() => handleEdit(job)}
              onDelete={() => handleDelete(job._id)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
