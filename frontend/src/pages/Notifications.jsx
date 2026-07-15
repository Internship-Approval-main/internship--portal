import React, { useState, useEffect } from "react";
import axios from "axios";

// Change these to your backend's actual endpoints
const NOTIFICATIONS_URL = "http://localhost:5000/api/notifications";
const MARK_ALL_READ_URL = "http://localhost:5000/api/notifications/mark-all-read";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(NOTIFICATIONS_URL, {
        withCredentials: true, // remove if you're using token auth instead
      });

      // Expecting the backend to return an array of:
      // { id, title, message, date, type, read }
      setNotifications(response.data || []);
    } catch (err) {
      console.log(err);
      const message =
        err.response?.data?.message || "Unable to load notifications.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    setMarking(true);

    try {
      await axios.patch(MARK_ALL_READ_URL, {}, { withCredentials: true });

      // Reflect the change locally without needing a full refetch
      setNotifications((prev) =>
        prev.map((item) => ({ ...item, read: true }))
      );
    } catch (err) {
      console.log(err);
      setError("Could not mark notifications as read. Please try again.");
    } finally {
      setMarking(false);
    }
  };

  const goToDashboard = () => {
    // If you're using react-router-dom, swap this for: navigate("/dashboard")
    window.location.href = "/dashboard";
  };

  const getColor = (type) => {
    switch (type) {
      case "success":
        return "border-green-500 bg-green-50";
      case "warning":
        return "border-yellow-500 bg-yellow-50";
      case "info":
        return "border-blue-500 bg-blue-50";
      default:
        return "border-gray-400 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          Notifications
        </h1>

        {/* Error state */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={fetchNotifications}
              className="text-sm font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <p className="text-gray-500">Loading notifications...</p>
        )}

        {/* Empty state */}
        {!loading && !error && notifications.length === 0 && (
          <p className="text-gray-500">You have no notifications yet.</p>
        )}

        {/* Notifications list */}
        {!loading && notifications.length > 0 && (
          <div className="space-y-5">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`border-l-4 p-5 rounded-lg shadow ${getColor(
                  item.type
                )} ${item.read ? "opacity-60" : ""}`}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>

                <p className="text-gray-700 mt-2">{item.message}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <button
            onClick={markAllAsRead}
            disabled={marking || notifications.length === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg"
          >
            {marking ? "Marking..." : "Mark All as Read"}
          </button>

          <button
            onClick={goToDashboard}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
