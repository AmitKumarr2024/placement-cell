import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await fetch('/api/users/logout', { method: 'POST' });
        navigate('/login'); // Redirect to login page
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
