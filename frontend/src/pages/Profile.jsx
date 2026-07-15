import React, { useState, useEffect } from "react";
import axios from "axios";
import './Profile.css'

// Change these to your backend's actual endpoints
const PROFILE_URL = "http://localhost:5000/api/student/profile";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(PROFILE_URL, {
        withCredentials: true, // remove if you're using token auth instead
      });

      // Expecting the backend to return:
      // { name, srn, branch, semester, email, phone, cgpa, section, avatarUrl }
      setStudent(response.data);
      setForm(response.data);
    } catch (err) {
      console.log(err);
      const message =
        err.response?.data?.message || "Unable to load your profile.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = () => {
    setForm(student); // start from the last saved values
    setEditMode(true);
  };

  const cancelEditing = () => {
    setForm(student); // discard unsaved changes
    setEditMode(false);
  };

  const saveProfile = async () => {
    setSaving(true);
    setError("");

    try {
      // Only email and phone are typically editable by the student;
      // academic fields usually come from the college's system.
      const response = await axios.put(
        PROFILE_URL,
        { email: form.email, phone: form.phone },
        { withCredentials: true }
      );

      setStudent(response.data);
      setForm(response.data);
      setEditMode(false);
    } catch (err) {
      console.log(err);
      const message =
        err.response?.data?.message || "Could not save your changes.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const goToDashboard = () => {
    // If you're using react-router-dom, swap this for: navigate("/dashboard")
    window.location.href = "/dashboard";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <p className="text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !student) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const avatarUrl =
    student.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      student.name
    )}&background=2563eb&color=fff`;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Student Profile
        </h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex items-center gap-6 mb-8">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-600"
          />

          <div>
            <h2 className="text-2xl font-semibold">{student.name}</h2>
            <p className="text-gray-600">{student.branch}</p>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Active Student
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 rounded-lg shadow">
            <h3 className="font-semibold text-blue-600 mb-4">
              Academic Details
            </h3>

            <p><strong>SRN:</strong> {student.srn}</p>
            <p><strong>Branch:</strong> {student.branch}</p>
            <p><strong>Semester:</strong> {student.semester}</p>
            <p><strong>Section:</strong> {student.section}</p>
            <p><strong>CGPA:</strong> {student.cgpa}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg shadow">
            <h3 className="font-semibold text-blue-600 mb-4">
              Contact Details
            </h3>

            {editMode ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                  />
                </div>
              </div>
            ) : (
              <>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          {editMode ? (
            <>
              <button
                onClick={saveProfile}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={cancelEditing}
                disabled={saving}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={startEditing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Edit Profile
              </button>

              <button
                onClick={goToDashboard}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
              >
                Back to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
