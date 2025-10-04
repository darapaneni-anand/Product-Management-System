import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div id="contact" style={styles.container}>
        <span>© {new Date().getFullYear()} Product Management App. All rights reserved.</span>
        <span style={styles.contact}>Email: support@productapp.com</span>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#2c3e50",
    color: "#fff",
    padding: "20px 30px", 
    textAlign: "center",
    marginTop: "50px",
    fontSize: "0.9rem", 
  },
  container: {
    display: "flex",
    flexDirection: "column", 
    alignItems: "center",
    gap: "15px", 
  },
  contact: {
    fontSize: "0.85rem",
    color: "#ddd",
  },
};

export default Footer;
