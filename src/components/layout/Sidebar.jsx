import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  const styles = {
    sidebar: {
      width: "200px",
      background: "#1e293b",
      color: "white",
      padding: "20px",
      minHeight: "100vh",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    navLink: {
      display: "block",
      color: "white",
      textDecoration: "none",
      padding: "10px 0",
      borderBottom: "1px solid #334155",
      marginBottom: "10px",
    },
    navLinkHover: {
      color: "#60a5fa",
    },
    logoutBtn: {
      marginTop: "20px",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      width: "100%",
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.title}>LeaveMS</div>
      <Link to="/dashboard" style={styles.navLink}>📊 Dashboard</Link>
      <Link to="/apply" style={styles.navLink}>📝 Apply Leave</Link>
      <Link to="/history" style={styles.navLink}>📋 My Leaves</Link>
      {user?.role === "Admin" && (
        <Link to="/manage" style={styles.navLink}>✅ Manage Leaves</Link>
      )}
      <button style={styles.logoutBtn} onClick={logout}>Logout</button>
    </div>
  );
}

export default Sidebar;