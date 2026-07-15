import React from "react";

const EmptyState = ({ title, message }) => {
  return (
    <div className="text-center py-20">

      <div className="text-6xl mb-4">
        📂
      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {message}
      </p>

    </div>
  );
};

export default EmptyState;