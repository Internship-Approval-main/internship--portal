import React, { useState } from "react";

import "./Dashboard.css";

const FacultyDashboard = () => {
  // Mock data representing students applying for internship credits
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Aditya Narayan",
      srn: "PES1UG22CS101",
      sem: "6",
      status: "Pending Approval",
      registration: {
        company: "TechNova Solutions",
        website: "https://technova.io",
        role: "Frontend Developer Intern",
        type: "Off-Campus",
        startDate: "16-01-2026",
        endDate: "16-07-2026",
        cgpa: "8.5",
        stipend: "Paid (₹20,000/month)",
        offerLetter: "Aditya_OfferLetter_TechNova.pdf"
      }
    },
    {
      id: 2,
      name: "Meghana Rao",
      srn: "PES1UG22CS205",
      sem: "6",
      status: "Approved", 
      registration: {
        company: "PESU Research Lab",
        website: "N/A",
        role: "Data Science Intern",
        type: "On-Campus",
        startDate: "01-02-2026",
        endDate: "01-06-2026",
        cgpa: "9.2",
        stipend: "Unpaid",
        offerLetter: "Meghana_OnCampus_Approval.pdf"
      }
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleOpenDetails = (student) => {
    setSelectedStudent(student);
    setShowRejectBox(false);
    setRejectReason("");
  };

  const handleApprove = () => {
    setStudents((prev) =>
      prev.map((s) => (s.id === selectedStudent.id ? { ...s, status: "Approved" } : s))
    );
    alert(`${selectedStudent.name}'s internship has been APPROVED for credits.`);
    setSelectedStudent(null);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejecting the internship.");
      return;
    }
    setStudents((prev) =>
      prev.map((s) => (s.id === selectedStudent.id ? { ...s, status: "Rejected", rejectReason } : s))
    );
    alert(`${selectedStudent.name}'s internship has been REJECTED.`);
    setSelectedStudent(null);
  };

  return (
    <div className="faculty-layout">
      
      <div className="faculty-content">
        
        {/* LIST VIEW (Visible when no student is selected) */}
        {!selectedStudent && (
          <div className="list-container">
            <div className="faculty-card">
              
              <div className="header-section">
                <h2>Internship Approvals</h2>
                <p>Review student internship applications, verify offer letters, and approve them for credit allocation.</p>
              </div>

              <div className="table-responsive">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>SRN</th>
                      <th>Sem</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.srn}</td>
                        <td>{student.sem}</td>
                        <td>
                          <span className={`status-badge ${student.status.replace(/\s+/g, '-').toLowerCase()}`}>
                            {student.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-action primary" onClick={() => handleOpenDetails(student)}>
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

        {/* DETAIL VIEW: APPROVAL PROCESS */}
        {selectedStudent && (
          <div className="detail-container">
            <button className="btn-back" onClick={() => setSelectedStudent(null)}>
              &larr; Back to Approvals
            </button>
            
            <div className="faculty-card">
              <h2>Internship Application Review</h2>
              <hr className="divider" />
              
              <div className="info-grid">
                
                {/* Student Details */}
                <div className="info-box">
                  <h4>Student Details</h4>
                  <p><strong>Name:</strong> {selectedStudent.name}</p>
                  <p><strong>SRN:</strong> {selectedStudent.srn}</p>
                  <p><strong>Semester:</strong> {selectedStudent.sem}</p>
                  <p><strong>CGPA:</strong> {selectedStudent.registration.cgpa}</p>
                </div>
                
                {/* Company Details */}
                <div className="info-box">
                  <h4>Company Details</h4>
                  <p><strong>Company:</strong> {selectedStudent.registration.company} ({selectedStudent.registration.type})</p>
                  <p><strong>Role:</strong> {selectedStudent.registration.role}</p>
                  <p><strong>Duration:</strong> {selectedStudent.registration.startDate} to {selectedStudent.registration.endDate}</p>
                  <p><strong>Stipend:</strong> {selectedStudent.registration.stipend}</p>
                </div>

                {/* Offer Letter Section */}
                <div className="info-box full-width offer-letter-box">
                  <h4>Offer Letter Document</h4>
                  <div className="document-card">
                    <div className="doc-icon">📄</div>
                    <div className="doc-info">
                      <p className="doc-name">{selectedStudent.registration.offerLetter}</p>
                      <p className="doc-sub">PDF Document</p>
                    </div>
                    <button className="btn-view-doc" onClick={(e) => { e.preventDefault(); alert("Opening document viewer..."); }}>
                      View Document
                    </button>
                  </div>
                </div>

              </div>

              <hr className="divider" />

              {/* Approval & Rejection Logic */}
              <div className="approval-actions">
                {selectedStudent.status !== "Pending Approval" ? (
                  <div className="status-notice">
                    This application has already been <strong>{selectedStudent.status}</strong>.
                    {selectedStudent.status === "Rejected" && (
                      <p className="reject-reason-text">Reason: {selectedStudent.rejectReason}</p>
                    )}
                  </div>
                ) : !showRejectBox ? (
                  <>
                    <button className="btn-reject" onClick={() => setShowRejectBox(true)}>Reject</button>
                    <button className="btn-approve" onClick={handleApprove}>Approve for Credits</button>
                  </>
                ) : (
                  <div className="reject-form">
                    <label>Reason for Rejection <span className="required">*</span></label>
                    <textarea 
                      rows="3" 
                      placeholder="Explain why this internship is not approved. This will be sent to the student..."
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    ></textarea>
                    <div className="reject-actions">
                      <button className="btn-cancel" onClick={() => setShowRejectBox(false)}>Cancel</button>
                      <button className="btn-reject confirm" onClick={handleReject}>Confirm Rejection</button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
      
    </div>
  );
};

export default FacultyDashboard;