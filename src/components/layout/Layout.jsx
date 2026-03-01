import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      flexDirection: "column",
    },
    mainContent: {
      display: "flex",
      flex: 1,
      overflow: "hidden",
    },
    sidebarContainer: {
      overflowY: "auto",
    },
    pageContent: {
      flex: 1,
      overflowY: "auto",
      backgroundColor: "#f8fafc",
    },
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContent}>
        <div style={styles.sidebarContainer}>
          <Sidebar />
        </div>
        <div style={styles.pageContent}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
