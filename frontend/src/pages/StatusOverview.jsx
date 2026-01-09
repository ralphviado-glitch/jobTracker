import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";

export default function StatusOverview() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await apiRequest("/jobs", "GET");
        setJobs(data);
      } catch (err) {
        setError("Failed to load jobs.");
      }
    };
    fetchJobs();
  }, []);

  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const filteredJobs = jobs.filter(job => filter === "All" ? true : job.status === filter)
                           .sort((a,b) => new Date(b.appliedAt) - new Date(a.appliedAt));

  return (
    <div className="container my-4">
      <h1 className="h3 mb-4">Overview</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mb-4">
        {["Applied", "Interview", "Offer", "Rejected", "All"].map(status => (
          <div key={status} className="col-md mb-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{status}</h5>
                <p className="card-text display-6">
                  {status === "All" ? jobs.length : statusCounts[status] || 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-3 d-flex align-items-center gap-2">
        <label className="mb-0 fw-medium">Filter by Status:</label>
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

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Follow-up Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted p-3">
                  No job applications found.
                </td>
              </tr>
            ) : (
              filteredJobs.map(job => {
                const isOverdue = job.followUpDate && new Date(job.followUpDate) < new Date();
                return (
                  <tr key={job._id} className={isOverdue ? "table-danger" : ""}>
                    <td>{job.company}</td>
                    <td>{job.position}</td>
                    <td>{job.status}</td>
                    <td>{new Date(job.appliedAt).toLocaleDateString()}</td>
                    <td>{job.followUpDate ? new Date(job.followUpDate).toLocaleDateString() : "-"}</td>
                    <td>{job.notes || "-"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
