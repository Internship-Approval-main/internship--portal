import React from "react";
import "./Footer.css";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-section">
          <h2>Internship Approval</h2>
          <p>
            A centralized portal for students and coordinators to manage
            internship applications, approvals, evaluations, and progress
            efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/internship-form">Apply Internship</a></li>
            <li><a href="/status">Track Status</a></li>
            <li><a href="/chatbot">AI Assistant</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>
            <FaEnvelope className="footer-icon" />
            internship@pes.edu
          </p>

          <p>
            <FaPhoneAlt className="footer-icon" />
            +91 80 2672 6622
          </p>

          <p>
            <FaMapMarkerAlt className="footer-icon" />
            PES University, Bengaluru
          </p>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h3>Connect</h3>

          <div className="social-icons">
            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>
          </div>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        © {year} Internship Approval Portal | PES University
      </div>

    </footer>
  );
};

export default Footer;