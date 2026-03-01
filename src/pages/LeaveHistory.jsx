import { useEffect, useState } from "react";
import leaveService from "../api/leaveService";
import LeaveTable from "../components/leave/LeaveTable";

function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await leaveService.getMyLeaves();
        setLeaves(res.data);
      } catch (err) {
        setError("Failed to load leave history");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  const styles = {
    container: {
      padding: "20px",
    },
    error: {
      color: "red",
      padding: "10px",
      backgroundColor: "#fee",
      borderRadius: "4px",
      marginBottom: "20px",
    },
    loading: {
      textAlign: "center",
      padding: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h2>My Leave History</h2>
      {error && <div style={styles.error}>{error}</div>}
      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : leaves.length === 0 ? (
        <div style={styles.loading}>No leaves found</div>
      ) : (
        <LeaveTable leaves={leaves} />
      )}
    </div>
  );
}

export default LeaveHistory;