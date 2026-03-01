import { useEffect, useState } from "react";
import leaveService from "../api/leaveService";

function Dashboard() {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await leaveService.getSummary();
        setSummary(res.data);
      } catch (err) {
        setError("Failed to load summary");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const styles = {
    container: {
      padding: "30px",
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    card: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      textAlign: "center",
      border: "1px solid #e2e8f0",
    },
    cardTitle: {
      color: "#64748b",
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    cardValue: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    totalCard: {
      borderLeft: "4px solid #3b82f6",
    },
    pendingCard: {
      borderLeft: "4px solid #f59e0b",
    },
    approvedCard: {
      borderLeft: "4px solid #16a34a",
    },
    rejectedCard: {
      borderLeft: "4px solid #dc2626",
    },
    error: {
      color: "red",
      padding: "10px",
      backgroundColor: "#fee",
      borderRadius: "4px",
    },
    loading: {
      textAlign: "center",
      padding: "40px",
      color: "#64748b",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>
      {error && <div style={styles.error}>{error}</div>}
      
      {loading ? (
        <div style={styles.loading}>Loading summary...</div>
      ) : (
        <div style={styles.cardsContainer}>
          <div style={{...styles.card, ...styles.totalCard}}>
            <div style={styles.cardTitle}>Total Leaves</div>
            <div style={styles.cardValue}>{summary.total || 0}</div>
          </div>
          
          <div style={{...styles.card, ...styles.pendingCard}}>
            <div style={styles.cardTitle}>Pending</div>
            <div style={styles.cardValue}>{summary.pending || 0}</div>
          </div>
          
          <div style={{...styles.card, ...styles.approvedCard}}>
            <div style={styles.cardTitle}>Approved</div>
            <div style={styles.cardValue}>{summary.approved || 0}</div>
          </div>
          
          <div style={{...styles.card, ...styles.rejectedCard}}>
            <div style={styles.cardTitle}>Rejected</div>
            <div style={styles.cardValue}>{summary.rejected || 0}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;