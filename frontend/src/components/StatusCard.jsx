export default function StatusCard({ title, count }) {
  return (
    <div className="card text-center shadow-sm">
      <div className="card-body">
        {/* Card title */}
        <h5 className="card-title text-muted">{title}</h5>
        {/* Count */}
        <p className="card-text fs-3 fw-bold">{count}</p>
      </div>
    </div>
  );
}
