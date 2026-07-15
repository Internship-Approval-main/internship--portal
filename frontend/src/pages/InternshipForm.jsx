import axios from "axios";
import { useState } from "react";
import './InternshipForm.css'

// 📅 Helper function to calculate minimum weeks ahead
const addWeeks = (dateString, weeks) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  date.setDate(date.getDate() + weeks * 7);
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
};

export default function InternshipForm() {
  const [form, setForm] = useState({
    studentName: "",
    studentEmail: "",
    srn: "",  // Fixed missing initial state from your template
    cgpa: "", // Fixed missing initial state from your template
    startDate: "",
    endDate: "",
    campus: "On Campus",
    company: "",
    role: "",
    managerName: "",
    managerEmail: "",
    internshipNature: "Paid",
    category: "Industry",
    researchCenter: "",
    otherResearchCenter: "",
    stipend: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // 🔒 Validation Rule: Reset invalid end dates if start date moves ahead
      if (name === 'startDate' && updatedForm.endDate) {
        const minAllowedDate = addWeeks(value, 6); // Set to 6 weeks duration constraint
        if (updatedForm.endDate < minAllowedDate) {
          updatedForm.endDate = ''; // Auto-clear if constraint is breached
        }
      }

      return updatedForm;
    });
  };

  const submit = async (e) => {

  e.preventDefault();

  try {

    const payload = {

      srn: form.srn,

      student_name: form.studentName,

      student_email: form.studentEmail,

      semester: "8",

      placements: [

        {

          campus_type: form.campus,

          internship_type: form.category,

          company: form.company,

          role: form.role,

          start_date: form.startDate,

          end_date: form.endDate,

          manager_name: form.managerName,

          manager_email: form.managerEmail,

          research_centre:
            form.researchCenter === "Other"
              ? form.otherResearchCenter
              : form.researchCenter

        }

      ]

    };

    const token = localStorage.getItem("authToken");

const response = await axios.post(

  "http://localhost:5000/api/student/register",

  payload,

  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

);

    alert(response.data.message);

    console.log(response.data);

  }

  catch (error) {

    console.log(error);

    alert("Registration Failed");

  }

};

  // Enforces 6 weeks. Adjust the number 6 below to change the duration window.
  const minEndDate = form.startDate ? addWeeks(form.startDate, 6) : '';

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Internship Registration
      </h1>

      <form onSubmit={submit} className="space-y-6">

        {/* Student Details */}
        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={form.studentName}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            name="studentEmail"
            placeholder="Student Email"
            value={form.studentEmail}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="srn"
            placeholder="Enter SRN"
            value={form.srn || ""}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
  type="number"
  name="cgpa"
  placeholder="Enter your GPA"
  value={form.cgpa || ""}
  onChange={handleChange}
  className="border rounded-lg p-3"
/>
        </div>

        {/* Dates section with 6-week constraint */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Start Date Box */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
              Start Date
            </label>
            <input 
              type="date" 
              name="startDate" 
              value={form.startDate} 
              onChange={handleChange} 
              className="border rounded-lg p-3 w-full" 
            />
          </div>

          {/* End Date Box */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
              End Date (Min 6 weeks)
            </label>
            <input 
              type="date" 
              name="endDate" 
              value={form.endDate} 
              onChange={handleChange} 
              min={minEndDate} // Gray out illegal dates
              disabled={!form.startDate} // Prevent selection before start date is set
              className="border rounded-lg p-3 w-full disabled:bg-gray-100 disabled:cursor-not-allowed" 
            />
          </div>
        </div>

        {/* Campus */}
        <select
          name="campus"
          value={form.campus}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full"
        >
          <option>On Campus</option>
          <option>Off Campus</option>
        </select>

        {/* Company Details */}
        {form.campus === "Off Campus" && (
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="company"
              placeholder="Company/ Institution Name"
              value={form.company}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              value={form.role}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="managerName"
              placeholder="Manager/ Supervisor Name"
              value={form.managerName}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="email"
              name="managerEmail"
              placeholder="Manager/ Supervisor Email"
              value={form.managerEmail}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />
          </div>
        )}

        {/* Paid / Unpaid */}
        <select
          name="internshipNature"
          value={form.internshipNature}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full"
        >
          <option>Paid</option>
          <option>Unpaid</option>
        </select>

        {/* Stipend */}
        {form.internshipNature === "Paid" && (
          <input
            type="number"
            name="stipend"
            placeholder="Monthly Stipend"
            value={form.stipend}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          />
        )}

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full"
        >
          <option>Industry</option>
          <option>Research</option>
        </select>

        {/* Research Center */}
        {form.category === "Research" && (
          <select
            name="researchCenter"
            value={form.researchCenter}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          >
            <option value="">Select Research Centre</option>
            <option value="CCBD">CCBD</option>
            <option value="ISFCR">ISFCR</option>
            <option value="CSDML">CSDML</option>
            <option value="PiLabs">Pi Labs</option>
            <option value="CHeal">CHeal</option>
            <option value="IOT">IOT</option>
            <option value="PVL Labs">PVL Labs</option>
            <option value="RAAS">RAAS</option>
            <option value="Other">Other</option>
          </select>
        )}

        {/* Other Research Center */}
        {form.category === "Research" && form.researchCenter === "Other" && (
          <input
            type="text"
            name="otherResearchCenter"
            placeholder="Enter Research Centre Name"
            value={form.otherResearchCenter}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          />
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold text-lg"
        >
          Submit
        </button>

      </form>
    </div>
  );
}
