import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"; // Recommended for React routing
import {
  FaUserGraduate,
  FaUserTie,
  FaChalkboardTeacher,
  FaUserShield,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = () => {
  // Navigation hook
  const navigate = useNavigate();

  // Multi-role state
  const roles = ["Student", "Manager", "Faculty", "Admin"];
  const [activeRole, setActiveRole] = useState("Student");

  // Form states
  const [identifier, setIdentifier] = useState(""); // Replaced 'srn' with a generic identifier
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Get the appropriate icon based on role
  const getRoleIcon = () => {
    switch (activeRole) {
      case "Student": return <FaUserGraduate />;
      case "Manager": return <FaUserTie />;
      case "Faculty": return <FaChalkboardTeacher />;
      case "Admin": return <FaUserShield />;
      default: return <FaUserGraduate />;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Dynamically set the API endpoint based on the selected role
    // Adjust these endpoints to match your actual backend routes
    const API_URL = `http://localhost:5000/api/auth/${activeRole.toLowerCase()}/login`;

    try {
      // Sending the identifier (SRN/Email/ID) and password
      const response = await axios.post(API_URL, { identifier, password });
      
      // Assuming backend returns { token, user }
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userRole", activeRole);
      }

      // Redirect to the respective dashboard based on role
      switch (activeRole) {
        case "Student":
          navigate("/student-dashboard");
          break;
        case "Manager":
          navigate("/manager-dashboard");
          break;
        case "Faculty":
          navigate("/faculty-dashboard");
          break;
        case "Admin":
          navigate("/admin-dashboard");
          break;
        default:
          navigate("/");
      }

      // Fallback if not using react-router-dom:
      // window.location.href = `/${activeRole.toLowerCase()}-dashboard`;

    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.message ||
        `Invalid ${activeRole === "Student" ? "SRN" : "Credentials"} or password. Please try again.`;
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="login-page">
        <div className="overlay"></div>
        <div className="login-card">
          
          {/* Role Selection Tabs */}
          <div className="role-tabs" style={styles.tabContainer}>
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                style={activeRole === role ? styles.activeTab : styles.tab}
                onClick={() => {
                  setActiveRole(role);
                  setErrorMessage(""); 
                  setIdentifier(""); 
                  setPassword("");
                }}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="avatar">
            {getRoleIcon()}
          </div>
          
          <h1>{activeRole} SIGN IN</h1>
          <div className="orange-line"></div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleLogin}>
            <div className="input-box">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder={activeRole === "Student" ? "Enter SRN" : "Enter Email / ID"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            
            <div className="input-box">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            
            <div className="forgot">
              <a href="/">Forgot Password?</a>
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>
            
            <div className="divider">
              <span></span>
              <p>or</p>
              <span></span>
            </div>
            
            <p className="signup">
              Don't have an account?
              <a href="/"> Sign up</a>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

// Inline styles for tabs (You can move these to Login.css)
const styles = {
  tabContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    borderBottom: "2px solid #eee",
  },
  tab: {
    background: "none",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#666",
    flex: 1,
  },
  activeTab: {
    background: "none",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#0a2351", // Matches your PES dark blue theme in image_1e6b8a.png
    borderBottom: "3px solid #f2a900", // Matches your PES orange accent
    flex: 1,
  }
};

export default Login;