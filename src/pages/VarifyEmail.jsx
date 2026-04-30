import React, { useState, useEffect } from 'react';
import axios from "@/api/axios";
import { useNavigate, useParams } from 'react-router-dom';

const VarifyEmail = () => {
  const [status, setStatus] = useState('Verifying your email...');
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    let ignore = false;
    let redirectTimer;

    const verifyEmail = async () => {
      if (!token) {
        setStatus('No verification token found.');
        return;
      }

      try {
        const res = await axios.post(`/api/user/varify/${token}`);

        if (!ignore && res.data.success) {
          setStatus('Email verified successfully.');
          redirectTimer = window.setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (error) {
        console.error("Verification Error:", error);
        if (!ignore) {
          const errorMsg = error.response?.data?.message || 'Verification failed. Please try again';
          setStatus(errorMsg);
        }
      }
    };

    void verifyEmail();

    return () => {
      ignore = true;
      if (redirectTimer) {
        window.clearTimeout(redirectTimer);
      }
    };
  }, [navigate, token]);

  return (
    <div className='relative w-full h-screen bg-pink-50 flex items-center justify-center overflow-hidden'>
      <div className='bg-white p-10 rounded-3xl shadow-xl text-center w-[90%] max-w-md border border-pink-100'>
        <div className='mb-4'>
            {status.includes('Verifying') && <div className="animate-spin h-8 w-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>}
        </div>
        <h2 className='text-2xl font-bold text-gray-800 transition-all duration-300'>
            {status}
        </h2>
        {!status.includes('successfully') && !status.includes('Verifying') && (
            <button
                onClick={() => navigate('/signup')}
                className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
                Back to Signup
            </button>
        )}
      </div>
    </div>
  );
};

export default VarifyEmail;
