import React, { useState } from "react";
import useCreateInterview from "../../Hooks/interview/useCreateInterview";

const CreateBox = ({ onSuccess }) => {
  const [companyName, setCompanyName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const { createInterview, loading, error, success } = useCreateInterview();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInterview({ companyName, date, status });
      if (success) {
        // Reset the form fields
        setCompanyName("");
        setDate("");
        setStatus("");
        // Call the onSuccess function to trigger data refresh
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error("Failed to create interview", err);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter Company Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interview Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded-md font-medium ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Interview"}
        </button>
      </form>
    </div>
  );
};

export default CreateBox;
