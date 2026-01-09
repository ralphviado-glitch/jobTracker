import StatusDropdown from "./StatusDropdown";

export default function JobCard({ job, onEdit, onDelete, onStatusChange }) {
  const isOverdue = job.followUpDate && new Date(job.followUpDate) < new Date();

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h5 className="card-title">
            {job.position} <small className="text-muted">at {job.company}</small>
          </h5>
          <p className="mb-1 text-muted">Applied on: {new Date(job.appliedAt).toLocaleDateString()}</p>
          <div className="mb-1">
            <StatusDropdown
              job={job}
              onUpdate={(newStatus) => onStatusChange(job._id, newStatus)}
            />
          </div>
          {job.notes && <p className="mb-1 text-secondary">📝 {job.notes}</p>}
          {job.followUpDate && (
            <p className={`mb-0 ${isOverdue ? "text-danger fw-bold" : "text-warning"}`}>
              ⏰ Follow-up: {new Date(job.followUpDate).toLocaleDateString()}
              {isOverdue && " (Overdue)"}
            </p>
          )}
        </div>
        <div className="d-flex flex-column gap-2 ms-3">
          <button className="btn btn-outline-primary btn-sm" onClick={onEdit}>Edit</button>
          <button className="btn btn-outline-danger btn-sm" onClick={() => {
            if (window.confirm("Delete this job application?")) onDelete();
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}
