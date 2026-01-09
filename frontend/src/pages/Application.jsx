import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";
import JobCard from "../components/JobCard";
import JobFormModal from "../components/JobFormModal";

export default function Applications() {
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const data = await apiRequest("/jobs", "GET");
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>My Job Applications</h1>
        <button
          className="btn btn-success"
          onClick={() => setModalOpen(true)}
        >
          Add Application
        </button>
      </div>

      <div className="job-list d-flex flex-column gap-3">
        {jobs.map(job => (
          <JobCard
            key={job._id}
            job={job}
            onEdit={() => { setEditJob(job); setModalOpen(true); }}
            onDelete={() => {
              if (window.confirm("Are you sure?")) {
                apiRequest(`/jobs/${job._id}`, "DELETE").then(fetchJobs);
              }
            }}
          />
        ))}
      </div>

      {/* Modal for adding/editing jobs */}
      {modalOpen && (
        <JobFormModal
          job={editJob}
          onClose={() => { setModalOpen(false); setEditJob(null); fetchJobs(); }}
        />
      )}
    </div>
  );
}
