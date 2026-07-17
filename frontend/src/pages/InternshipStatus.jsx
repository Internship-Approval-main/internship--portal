import React, { useState, useEffect } from "react";
import {
  FaBuilding,
  FaUserTie,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaArrowLeft,
  FaFileAlt,
  FaDownload,
  FaUniversity,
} from "react-icons/fa";

import "./InternshipStatus.css";

// Change this to your backend's actual endpoint
const API_URL = "http://localhost:5000/api/student/status";
const InternshipStatus = () => {
  const [internship, setInternship] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [progress, setProgress] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);
const student = JSON.parse(localStorage.getItem("student"));
const srn = student?.srn;
  const fetchStatus = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

const response = await fetch(`${API_URL}/${srn}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
});
      if (!response.ok) {
        throw new Error("Unable to load internship status.");
      }

      const data = await response.json();
       console.log(data);
      // Expecting the backend to return: { internship, timeline, progress }
      setInternship(data.data);
console.log("Internship:", data.data);
setTimeline([
  {
    title: "Application Submitted",
    completed: true
  },
  {
    title: data.data.stage,
    completed: true
  }
]);

setProgress(50);
    } catch (err) {
      setError(err.message || "Something went wrong while fetching status.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(`${API_URL}/report`, {
  method: "GET"
});
      if (!response.ok) {
        throw new Error("Report download failed.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "internship-report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || "Could not download the report.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="status-page">
        <p>Loading internship status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-page">
        <p className="error-message">{error}</p>
        <button className="secondary-btn" onClick={fetchStatus}>
          Retry
        </button>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="status-page">
        <p>No internship record found.</p>
      </div>
    );
  }

  const statusClass = internship.status?.toLowerCase() || "pending";
  const evaluationClass = internship.evaluation?.toLowerCase() || "pending";

  return (
    <div className="status-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Internship Status</h1>
          <p>
            Track your internship approval, evaluation and overall progress.
          </p>
        </div>

        <button
          className="download-btn"
          onClick={handleDownload}
          disabled={downloading}
        >
          <FaDownload />
          {downloading ? "Preparing..." : "Download Report"}
        </button>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <FaCheckCircle className="stat-icon green" />
          <div>
            <h3>Status</h3>
            <span>{internship.status}</span>
          </div>
        </div>

        <div className="stat-card">
          <FaCalendarAlt className="stat-icon orange" />
          <div>
            <h3>Duration</h3>
            <span>{internship.duration}</span>
          </div>
        </div>

        <div className="stat-card">
          <FaUniversity className="stat-icon blue" />
          <div>
            <h3>Credits</h3>
            <span>{internship.credits}</span>
          </div>
        </div>

        <div className="stat-card">
          <FaClock className="stat-icon purple" />
          <div>
            <h3>Progress</h3>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Grid */}
      <div className="details-grid">
        {/* Internship Details */}
        <div className="card">
          <div className="card-header">
            <FaBuilding />
            <h2>Internship Details</h2>
          </div>

          <div className="info-row">
            <span>Company</span>
            <strong>{internship.company|| "-"}</strong>
          </div>

          <div className="info-row">
            <span>Role</span>
            <strong>{internship.role || "-"}</strong>
          </div>

          <div className="info-row">
            <span>Start Date</span>
            <strong>{internship.startDate || "-"}</strong>
          </div>

          <div className="info-row">
            <span>End Date</span>
            <strong>{internship.endDate || "-"}</strong>
          </div>
        </div>

        {/* Approval */}
        <div className="card">
          <div className="card-header">
            <FaUserTie />
            <h2>Approval Details</h2>
          </div>

          <div className="info-row">
            <span>Status</span>
            <span className={`badge ${statusClass}`}>
              {internship.status}
            </span>
          </div>

          <div className="info-row">
  <span>Current Stage</span>
  <strong>{internship.stage}</strong>
</div>

<div className="info-row">
  <span>Evaluation Mode</span>
  <strong>{internship.evaluationMode}</strong>
</div>

<div className="info-row">
  <span>Faculty Remarks</span>
  <strong>{internship.facultyRemarks || "-"}</strong>
</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="card timeline-card">
        <div className="card-header">
          <FaClock />
          <h2>Timeline</h2>
        </div>

        <ul className="timeline-list">
          {timeline.map((step, index) => (
            <li
              key={index}
              className={`timeline-step ${
                step.completed ? "completed" : "pending"
              }`}
            >
              <span className="timeline-dot" />
              <div>
                <strong>{step.title}</strong>
                <span className="timeline-date">{step.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button className="primary-btn">
          <FaFileAlt />
          View Internship Details
        </button>
        <button className="secondary-btn">
          <FaArrowLeft />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default InternshipStatus;
