
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={styles.header}>
      <h2 style={{ margin: 0 }}>Leave Management System</h2>

      <div style={styles.rightSection}>
        {user && (
          <>
            <span style={styles.userInfo}>
              Welcome, {user.name} ({user.role})
            </span>
            <button style={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  header: {
    height: "60px",
    backgroundColor: "#0f172a",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  userInfo: {
    fontSize: "14px",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Header;