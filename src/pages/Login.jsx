import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import authService from "../api/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await authService.login(form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    form: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#1e293b",
      fontSize: "28px",
      fontWeight: "bold",
    },
    errorBox: {
      color: "white",
      backgroundColor: "#dc2626",
      padding: "12px",
      borderRadius: "4px",
      marginBottom: "20px",
      textAlign: "center",
      fontSize: "14px",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#475569",
      fontWeight: "500",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #cbd5e1",
      borderRadius: "4px",
      fontSize: "14px",
      boxSizing: "border-box",
      transition: "border-color 0.3s",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginTop: "10px",
    },
    hint: {
      marginTop: "20px",
      textAlign: "center",
      color: "#64748b",
      fontSize: "12px",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.title}>Leave Management System</div>
        
        {error && <div style={styles.errorBox}>{error}</div>}
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input 
            type="email"
            placeholder=""
            style={styles.input}
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input 
            type="password" 
            placeholder=""
            style={styles.input}
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            required
          />
        </div>
        
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={styles.hint}>
          <p>Demo Credentials:</p>
          <p>Email: john@example.com | Password: password123</p>
          <p>Email: admin@example.com | Password: admin123</p>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;