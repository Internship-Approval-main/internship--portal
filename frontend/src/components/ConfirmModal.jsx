import React from "react";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white rounded-xl shadow-xl p-6 w-96">

        <h2 className="text-2xl font-bold mb-4">
          {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onCancel}
            className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Confirm
          </button>

        </div>

      </div>

    </div>
  );
};

export default ConfirmModal;