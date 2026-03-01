function StatusBadge({ status }) {
  const getColor = () => {
    switch (status) {
      case "Approved":
        return "#16a34a";
      case "Rejected":
        return "#dc2626";
      case "Pending":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <span
      style={{
        backgroundColor: getColor(),
        color: "white",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;