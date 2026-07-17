import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaUserGraduate,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

// Change this to your backend's actual login endpoint
const API_URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const [srn, setSrn] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(API_URL, { srn, password });

      // Expecting the backend to return something like { token, student }
      const { token, student } = response.data;

      if (token) {
      localStorage.setItem("token", token);
      }
      if (student) {
        localStorage.setItem("student", JSON.stringify(student));
      }

      // Redirect to the dashboard after a successful login.
      // If you're using react-router, swap this for: navigate("/dashboard")
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.message ||
        "Invalid SRN or password. Please try again.";
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
          <div className="avatar">
            <FaUserGraduate />
          </div>
          <h1>Student SIGN IN</h1>
          <div className="orange-line"></div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleLogin}>
            <div className="input-box">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Enter SRN"
                value={srn}
                onChange={(e) => setSrn(e.target.value)}
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

export default Login;
