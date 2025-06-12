import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- Add this

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // <-- Use this instead of window.location.href

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/admin/login', {
        email: email,
        password: password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { role } = response.data;

      if (role === 'ADMIN') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', 'ADMIN');
        navigate('/admin-dashboard'); // ✅ SPA-style redirect
      } else {
        setError('Access denied: Not an admin user.');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "max(1000px, 100vh)",
      backgroundColor: "#f1fdf4",
    },
    card: {
      display: "flex",
      backgroundColor: "white",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      overflow: "hidden",
      width: "100%",
      maxWidth: "900px",
    },
    leftSection: {
      flex: "1",
      padding: "20px",
    },
    rightSection: {
      flex: "1",
      backgroundColor: "#e6f8e8",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
    },
    button: {
      width: "80%",
      padding: "10px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "20px",
    },
    buttonHover: {
      backgroundColor: "#218838",
    },
    link: {
      color: "#28a745",
      textDecoration: "none",
      fontSize: "14px",
      marginTop: "10px",
      display: "block",
      textAlign: "right",
    },
    image: {
      maxWidth: "70%",
    },
    contactText: {
      textAlign: "center",
      color: "#555",
      fontSize: "14px",
    },
    contactHighlight: {
      color: "#28a745",
      fontWeight: "bold",
    },
    error: {
      color: "red",
      fontSize: "14px",
      marginTop: "10px",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.leftSection}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Log in</h2>
          <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
            Login with your admin credentials.
          </p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="name@domain.com"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="********"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Log In
            </button>
          </form>

          <a href="/forgot-password" style={styles.link}>
            Forgot Password?
          </a>
        </div>

        <div style={styles.rightSection}>
          <img src="/EthiCraft.png" alt="Illustration" style={styles.image} />
          <p style={styles.contactText}>
            Don't have an account yet? <br />
            Contact us at{" "}
            <span style={styles.contactHighlight}>ethicraft101@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
