import { useEffect, useState } from "react";
import leaveService from "../api/leaveService";
import LeaveTable from "../components/leave/LeaveTable";

function ManageLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await leaveService.getAllLeaves();
      setLeaves(res.data);
    } catch (err) {
      setError("Failed to load leaves");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    try {
      await leaveService.updateStatus(id, status);
      alert(`Leave ${status}`);
      fetchLeaves(); // Refresh the list
    } catch (err) {
      alert("Failed to update leave status");
      console.error(err);
    }
  };

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
      <h2>Manage Leave Requests</h2>
      {error && <div style={styles.error}>{error}</div>}
      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : leaves.length === 0 ? (
        <div style={styles.loading}>No leave requests found</div>
      ) : (
        <LeaveTable leaves={leaves} onAction={handleAction} />
      )}
    </div>
  );
}

export default ManageLeaves;