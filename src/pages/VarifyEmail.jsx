import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VarifyEmail = () => {
  const [status, setStatus] = useState('Verifying your email...');
  const navigate = useNavigate();
  // Agar token URL mein hai (e.g. /verify/:token), toh useParams use karein
  const { token } = useParams(); 

  const varifyEmail = async () => {
    try {
      const res = await axios.post('https://ecombackend-8yfl.onrender.com/api/user/varify', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        setStatus('✅ Email Verified Successfully');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setStatus('❌ Verification failed. Please try again');
    }
  };

  // Page load hote hi verification function chal jaye
  useEffect(() => {
    if (token) {
      varifyEmail();
    } else {
      setStatus('❌ No verification token found.');
    }
  }, [token]);

  return (
    <div className='relative w-full h-[760px] bg-pink-100 overflow-hidden'>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-white p-8 rounded-2xl shadow-md text-center w-[90%] max-w-md'>
          <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>
        </div>
      </div>
    </div>
  );
};

export default VarifyEmail;
