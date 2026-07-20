import React, { useState, useEffect } from "react";

import "./AdminDashboard.css";
const API_URL = "http://localhost:5000/api/admin";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("faculty");

  const [teachers, setTeachers] = useState([]);
const [students, setStudents] = useState([]);
useEffect(() => {
  fetchFaculty();
  fetchStudents();
}, []);
const fetchFaculty = async () => {

  try {

    const response = await fetch(`${API_URL}/faculty`);

    const data = await response.json();

    if (data.success) {

      setTeachers(data.teachers);

    }

  }

  catch (err) {

    console.error(err);

    alert("Unable to load faculty.");

  }

};
const fetchStudents = async () => {

  try {

    const response = await fetch(`${API_URL}/student-overview`);

    const data = await response.json();

    if (data.success) {

      setStudents(data.students);

    }

  }

  catch (err) {

    console.error(err);

    alert("Unable to load students.");

  }

};

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
      ...students.map(s => `"${s.name}","${s.srn}","${s.managerScore}","${s.grade}","${
  s.grade === "A+" || s.grade === "A"
    ? 8
    : s.grade === "B+"
    ? 6
    : s.grade === "B"
    ? 4
    : "-"
}"`)
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
                        <td>
  {student.grade === "A+" || student.grade === "A"
    ? 8
    : student.grade === "B+"
    ? 6
    : student.grade === "B"
    ? 4
    : "-"}
</td>
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
      
    </div>
  );
};

export default AdminDashboard;