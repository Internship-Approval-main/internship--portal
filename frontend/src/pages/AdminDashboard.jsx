import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("faculty");

  // Mock data for Faculty Management
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Dr. Anil Kumar", email: "anil.kumar@pes.edu", department: "CSE", role: "Regular Faculty" },
    { id: 2, name: "Prof. Sunitha V.", email: "sunitha.v@pes.edu", department: "CSE", role: "Scrutiny Faculty" },
    { id: 3, name: "Dr. Ramesh B.", email: "ramesh.b@pes.edu", department: "ECE", role: "Regular Faculty" },
  ]);

  // Mock data for Student Overview
  const [students, setStudents] = useState([
    { id: 1, name: "Aditya Narayan", srn: "PES1UG22CS101", managerScore: 45, grade: "S", credits: 4 },
    { id: 2, name: "Meghana Rao", srn: "PES1UG22CS205", managerScore: 48, grade: "S", credits: 4 },
    { id: 3, name: "Rohan Kumar", srn: "PES1UG22CS312", managerScore: 35, grade: "B", credits: 4 },
    { id: 4, name: "Sneha Reddy", srn: "PES1UG22CS441", managerScore: 42, grade: "A", credits: 4 },
  ]);

  // Handle Inviting a Teacher
  const handleInvite = (teacher) => {
    // Simulate sending an email
    alert(`An invitation email has been sent to ${teacher.email}. They are now assigned as Scrutiny Faculty.`);
    
    // Update the teacher's role in the state
    setTeachers((prev) =>
      prev.map((t) => (t.id === teacher.id ? { ...t, role: "Scrutiny Faculty" } : t))
    );
  };

  // Handle Downloading Student Data as an Excel/CSV file
  const handleDownloadExcel = () => {
    // Define CSV Headers
    const headers = ["Name", "SRN", "Manager Score (/50)", "Grade", "Credits"];
    
    // Map student data to CSV format
    const csvContent = [
      headers.join(","),
      ...students.map(s => `"${s.name}","${s.srn}","${s.managerScore}","${s.grade}","${s.credits}"`)
    ].join("\n");

    // Create a downloadable blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", "Internship_Student_Records.csv"); // Downloads as a CSV (opens in Excel)
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-content">
        <div className="admin-card">
          
          <div className="header-section">
            <h2>Administrator Console</h2>
            <p>Manage scrutiny faculty assignments and oversee student internship records.</p>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="admin-tabs">
            <button 
              className={`tab-btn ${activeTab === "faculty" ? "active" : ""}`}
              onClick={() => setActiveTab("faculty")}
            >
              Scrutiny Faculty Management
            </button>
            <button 
              className={`tab-btn ${activeTab === "students" ? "active" : ""}`}
              onClick={() => setActiveTab("students")}
            >
              Student Internship Overview
            </button>
          </div>

          {/* TAB 1: Faculty Management */}
          {activeTab === "faculty" && (
            <div className="tab-content">
              <div className="tab-header">
                <h3>Faculty Directory</h3>
                <p>Add and invite teachers to serve as Scrutiny Faculty for internship approvals.</p>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Email</th>
                      <th>Current Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr key={teacher.id}>
                        <td>{teacher.name}</td>
                        <td>{teacher.department}</td>
                        <td>{teacher.email}</td>
                        <td>
                          <span className={`role-badge ${teacher.role === "Scrutiny Faculty" ? "scrutiny" : "regular"}`}>
                            {teacher.role}
                          </span>
                        </td>
                        <td>
                          {teacher.role !== "Scrutiny Faculty" ? (
                            <button 
                              className="btn-action primary"
                              onClick={() => handleInvite(teacher)}
                            >
                              Add & Invite
                            </button>
                          ) : (
                            <span className="text-muted">Invited / Assigned</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Student Overview */}
          {activeTab === "students" && (
            <div className="tab-content">
              <div className="tab-header flex-between">
                <div>
                  <h3>Student Internship Records</h3>
                  <p>Comprehensive overview of student grades and manager evaluation scores.</p>
                </div>
                <button className="btn-download" onClick={handleDownloadExcel}>
                  <span className="icon">📥</span> Download Excel (CSV)
                </button>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>SRN</th>
                      <th>Manager Score (/50)</th>
                      <th>Final Grade</th>
                      <th>Credits Awarded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.srn}</td>
                        <td className="score-cell">
                          <strong>{student.managerScore}</strong> / 50
                        </td>
                        <td>
                          <span className={`grade-badge grade-${student.grade.toLowerCase()}`}>
                            {student.grade}
                          </span>
                        </td>
                        <td>{student.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* The bottom download button was successfully removed from here */}

            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;