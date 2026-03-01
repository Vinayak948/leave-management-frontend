import { useState } from "react";
import { useNavigate } from "react-router-dom";
import leaveService from "../../api/leaveService";

function LeaveForm() {
  const [form, setForm] = useState({
    FromDate: "",
    ToDate: "",
    Reason: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.FromDate || !form.ToDate || !form.Reason) {
      setError("All fields are required");
      return;
    }

    if (new Date(form.FromDate) > new Date(form.ToDate)) {
      setError("Start date must be before end date");
      return;
    }

    setLoading(true);
    try {
      await leaveService.applyLeave(form);
      setSuccess("Leave applied successfully!");
      setTimeout(() => navigate("/history"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "500px",
      margin: "0 auto",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
    },
    textarea: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
      minHeight: "100px",
      fontFamily: "Arial",
    },
    button: {
      padding: "10px",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
    },
    error: {
      color: "red",
      padding: "10px",
      backgroundColor: "#fee",
      borderRadius: "4px",
    },
    success: {
      color: "green",
      padding: "10px",
      backgroundColor: "#efe",
      borderRadius: "4px",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Apply for Leave</h2>
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      <form style={styles.form} onSubmit={handleSubmit}>
        <div>
          <label>From Date:</label>
          <input 
            type="date"
            required
            value={form.FromDate}
            onChange={(e) => setForm({...form, FromDate: e.target.value})}
            style={styles.input}
          />
        </div>
        <div>
          <label>To Date:</label>
          <input 
            type="date"
            required
            value={form.ToDate}
            onChange={(e) => setForm({...form, ToDate: e.target.value})}
            style={styles.input}
          />
        </div>
        <div>
          <label>Reason:</label>
          <textarea 
            placeholder="Enter your reason for leave"
            required
            value={form.Reason}
            onChange={(e) => setForm({...form, Reason: e.target.value})}
            style={styles.textarea}
          />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Submitting..." : "Apply Leave"}
        </button>
      </form>
    </div>
  );
}

export default LeaveForm;