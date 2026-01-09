export default function StatusBadge({ status }) {
  const colors = {
    Applied: "bg-primary text-white",
    Interview: "bg-warning text-dark",
    Offer: "bg-success text-white",
    Rejected: "bg-danger text-white",
  };

  return (
    <span className={`badge ${colors[status]} rounded-pill`}>
      {status}
    </span>
  );
}
