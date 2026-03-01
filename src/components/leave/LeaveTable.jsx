import StatusBadge from "../common/StatusBadge";

function LeaveTable({ leaves, onAction }) {
  const styles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    th: {
      backgroundColor: "#1e293b",
      color: "white",
      padding: "12px",
      textAlign: "left",
      fontWeight: "bold",
      borderBottom: "2px solid #cbd5e1",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #e2e8f0",
    },
    tr: {
      backgroundColor: "#f8fafc",
    },
    trHover: {
      backgroundColor: "#f1f5f9",
    },
    button: {
      padding: "6px 12px",
      margin: "0 5px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "bold",
      transition: "background-color 0.3s",
    },
    approveBtn: {
      backgroundColor: "#16a34a",
      color: "white",
    },
    rejectBtn: {
      backgroundColor: "#dc2626",
      color: "white",
    },
  };

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Employee</th>
          <th style={styles.th}>Dates</th>
          <th style={styles.th}>Reason</th>
          <th style={styles.th}>Status</th>
          {onAction && <th style={styles.th}>Action</th>}
        </tr>
      </thead>
      <tbody>
        {leaves.map((l) => (
          <tr key={l.id} style={styles.tr}>
            <td style={styles.td}>{l.employeeName}</td>
            <td style={styles.td}>{l.startDate} - {l.endDate}</td>
            <td style={styles.td}>{l.reason || "-"}</td>
            <td style={styles.td}><StatusBadge status={l.status} /></td>
            {onAction && (
              <td style={styles.td}>
                <button 
                  onClick={() => onAction(l.id, "Approved")}
                  style={{...styles.button, ...styles.approveBtn}}
                >
                  ✓ Approve
                </button>
                <button 
                  onClick={() => onAction(l.id, "Rejected")}
                  style={{...styles.button, ...styles.rejectBtn}}
                >
                  ✗ Reject
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaveTable;