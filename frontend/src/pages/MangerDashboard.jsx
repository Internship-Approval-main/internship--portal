import React, { useState } from "react";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  // Mock list of students assigned to this manager
  const [students, setStudents] = useState([
    { id: 1, name: "Aditya Narayan", srn: "PES1UG22CS101", status: "Pending Evaluation" },
    { id: 2, name: "Meghana Rao", srn: "PES1UG22CS205", status: "Evaluated" },
    { id: 3, name: "Rohan Kumar", srn: "PES1UG22CS312", status: "Pending Evaluation" },
  ]);

  // View States
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reportDecision, setReportDecision] = useState(null); // null, 'company', or 'college'

  // Form State
  const [formData, setFormData] = useState({
    managerName: "",
    designation: "",
    companyName: "",
    emailId: "",
    studentSrn: "",
    studentName: "",
    startDate: "",
    endDate: "",
    confidenceLevel: "",
    proactiveApproach: "",
    graspConcepts: "",
    skillSetMaturity: "",
    deliveryOfWork: "",
    qualityOfDocs: "",
    oralCommunication: "",
    teamCoordination: "",
    buildRapport: "",
    overallRating: "",
    valuableSuggestion: "",
  });

  // Handlers
  const handleEvaluateClick = (student) => {
    setSelectedStudent(student);
    setReportDecision(null); // Reset gateway decision
    // Pre-fill the form with the selected student's details
    setFormData((prev) => ({
      ...prev,
      studentName: student.name,
      studentSrn: student.srn,
    }));
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    setReportDecision(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Feedback Data:", formData);
    alert(`Feedback for ${selectedStudent.name} submitted successfully!`);

    // Update student status in the list
    setStudents((prev) =>
      prev.map((s) => (s.id === selectedStudent.id ? { ...s, status: "Evaluated" } : s))
    );

    // Return to list view
    handleBackToList();
  };

  const clearForm = () => {
    if (window.confirm("Are you sure you want to clear the form?")) {
      setFormData((prev) => ({
        ...prev,
        managerName: "",
        designation: "",
        companyName: "",
        emailId: "",
        // Keep student details filled
        startDate: "",
        endDate: "",
        confidenceLevel: "",
        proactiveApproach: "",
        graspConcepts: "",
        skillSetMaturity: "",
        deliveryOfWork: "",
        qualityOfDocs: "",
        oralCommunication: "",
        teamCoordination: "",
        buildRapport: "",
        overallRating: "",
        valuableSuggestion: "",
      }));
    }
  };

  // Helper for horizontal rating rows (Number on top, radio on bottom)
  const RatingRow = ({ label, name, required }) => (
    <div className="rating-row">
      <div className="rating-label">
        {label} {required && <span className="required">*</span>}
      </div>
      <div className="rating-options">
        {[1, 2, 3, 4, 5].map((num) => (
          <label key={num} className="radio-label">
            <span className="radio-number">{num}</span>
            <input
              type="radio"
              name={name}
              value={num}
              checked={formData[name] === String(num)}
              onChange={(e) => handleRatingChange(name, e.target.value)}
              required={required}
            />
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dashboard-layout">
      
      <div className="dashboard-content">

        {/* VIEW 1: List of Students */}
        {!selectedStudent && (
          <div className="list-container">
            <div className="clean-card large-card">
              <div className="header-section">
                <h2>Assigned Interns</h2>
                <p>Select a student from the list below to provide their performance evaluation.</p>
              </div>

              <div className="table-responsive">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>SRN</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.srn}</td>
                        <td>
                          <span className={`status-badge ${student.status.replace(/\s+/g, '-').toLowerCase()}`}>
                            {student.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-evaluate"
                            onClick={() => handleEvaluateClick(student)}
                            disabled={student.status === "Evaluated"}
                          >
                            {student.status === "Evaluated" ? "Completed" : "Evaluate"}
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

        {/* VIEW 2: Gateway Question */}
        {selectedStudent && reportDecision === null && (
          <div className="clean-card">
            <h2>Internship Report Declaration</h2>
            <p>For <strong>{selectedStudent.name}</strong> ({selectedStudent.srn})</p>
            <p className="mt-2">Has the company agreed to provide Internship Evaluation?</p>
            <div className="gateway-buttons mt-3">
              <button className="btn-primary" onClick={() => setReportDecision('company')}>
                Yes,Company will provide report
              </button>
              <button className="btn-outline" onClick={() => setReportDecision('college')}>
                NO, College will handle the report
              </button>
            </div>
            <div className="mt-3">
              <button className="btn-text" onClick={handleBackToList}>&larr; Back to Student List</button>
            </div>
          </div>
        )}

        {/* VIEW 3A: Leave to College */}
        {selectedStudent && reportDecision === 'college' && (
          <div className="clean-card">
            <h2>Thank You</h2>
            <p>The college will handle the student's internship report process for <strong>{selectedStudent.name}</strong>.</p>
            <button className="btn-primary mt-3" onClick={() => {
              setStudents((prev) => prev.map((s) => (s.id === selectedStudent.id ? { ...s, status: "Evaluated" } : s)));
              handleBackToList();
            }}>
              Return to Dashboard
            </button>
          </div>
        )}

        {/* VIEW 3B: The Clean Form View */}
        {selectedStudent && reportDecision === 'company' && (
          <div className="clean-form-container">

            <button className="btn-text back-top" onClick={() => setReportDecision(null)}>
              &larr; Back
            </button>

            <div className="form-header">
              <h2>Internship Feedback Form</h2>
              <p className="subtitle">Please provide your evaluation for <strong>{selectedStudent.name}</strong>.</p>
            </div>

            <form onSubmit={handleSubmit} className="modern-form">

              <div className="form-grid-2">
                <div className="input-group">
                  <label>Manager Name</label>
                  <input type="text" name="managerName" value={formData.managerName} onChange={handleInputChange} placeholder="Enter your name" required />
                </div>
                <div className="input-group">
                  <label>Manager Email</label>
                  <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} placeholder="Enter your email" required />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="input-group">
                  <label>Designation</label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} placeholder="Your designation" required />
                </div>
                <div className="input-group">
                  <label>Company Name</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company / Institution Name" required />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="input-group">
                  <label>Student Name</label>
                  <input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="Enter student name" required readOnly style={{ backgroundColor: "#f9f9f9" }} />
                </div>
                <div className="input-group">
                  <label>Student SRN</label>
                  <input type="text" name="studentSrn" value={formData.studentSrn} onChange={handleInputChange} placeholder="Enter SRN" required readOnly style={{ backgroundColor: "#f9f9f9" }} />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="input-group">
                  <label>Start Date</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
                </div>
                <div className="input-group">
                  <label>End Date</label>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
                </div>
              </div>

              <hr className="divider" />

              <div className="section-title">
                <h4>Performance Evaluation (1 = Lowest, 5 = Highest)</h4>
              </div>

              <div className="ratings-container">
                <h5 className="category-title">Personal</h5>
                <RatingRow label="Confidence Level" name="confidenceLevel" required={true} />
                <RatingRow label="Proactive approach for Continuous Improvement" name="proactiveApproach" required={true} />

                <h5 className="category-title">Knowledge & Competencies</h5>
                <RatingRow label="Ability to grasp new Concepts" name="graspConcepts" required={true} />
                <RatingRow label="Skill Set Maturity" name="skillSetMaturity" required={true} />

                <h5 className="category-title">Delivery Process</h5>
                <RatingRow label="Delivery of Work as per commitment" name="deliveryOfWork" required={true} />
                <RatingRow label="Quality of Documentation" name="qualityOfDocs" required={true} />

                <h5 className="category-title">Communication & Relationships</h5>
                <RatingRow label="Oral Communication" name="oralCommunication" required={true} />
                <RatingRow label="Coordination with Team" name="teamCoordination" required={true} />
                <RatingRow label="Initiative to support and build rapport" name="buildRapport" required={false} />
              </div>

              <hr className="divider" />

              <div className="section-title">
                <h4>Overall Assessment</h4>
              </div>

              <RatingRow label="Please provide an overall rating:" name="overallRating" required={true} />

              <div className="input-group full-width mt-3">
                <label>What would be the single most valuable suggestion that you would like to give to the student/intern? <span className="required">*</span></label>
                <textarea
                  name="valuableSuggestion"
                  value={formData.valuableSuggestion}
                  onChange={handleInputChange}
                  placeholder="Your suggestions..."
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Action Buttons Container */}
              <div className="form-actions-grid">
                <button type="button" className="action-btn btn-back" onClick={handleBackToList}>
                  Back to List
                </button>
                <button type="button" className="action-btn btn-clear" onClick={clearForm}>
                  Clear Form
                </button>
                <button type="submit" className="action-btn btn-submit">
                  Submit Evaluation
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default ManagerDashboard;s