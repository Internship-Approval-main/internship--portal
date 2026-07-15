import React from "react";

import React from "react";

const StatusBadge = ({ status }) => {

  const styles = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
    "Evaluation Pending": "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-4 py-1 rounded-full font-semibold ${
        styles[status] || "bg-gray-200 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;