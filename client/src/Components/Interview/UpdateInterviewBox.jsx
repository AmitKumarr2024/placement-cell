import React, { useEffect, useState } from 'react';
import useUpdateInterview from '../../Hooks/interview/useUpdateInterview';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

const UpdateInterviewBox = ({ initialStatus, onStatusUpdate }) => {
  const { id } = useParams();
  const [status, setStatus] = useState(initialStatus || ''); // Pre-fill the initial status
  const { updateInterviewStatus, loading, error, success } = useUpdateInterview(id);

  useEffect(() => {
    if (success) {
      toast.success('Interview status updated successfully!');
      onStatusUpdate(); // Refresh parent data
    }
    if (error) {
      toast.error('Failed to update the interview status.');
    }
  }, [success, error, onStatusUpdate]); // Dependencies: Run when any of these change

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = async () => {
    if (!status) {
      toast.error('Please select a status.');
      return;
    }
    await updateInterviewStatus(status);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
          Interview Status
        </label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Complete</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className={`w-full py-2 px-4 text-white rounded-md font-medium ${
          loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Updating...' : 'Update Status'}
      </button>
    </div>
  );
};

export default UpdateInterviewBox;
