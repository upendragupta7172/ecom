// import React, { useState, useEffect } from 'react';
// import axios from "@/api/axios";
// import { useNavigate, useParams } from 'react-router-dom';

// const VarifyEmail = () => {
//   const [status, setStatus] = useState('Verifying your email...');
//   const navigate = useNavigate();
//   // Agar token URL mein hai (e.g. /verify/:token), toh useParams use karein
//   const { token } = useParams(); 

//   const varifyEmail = async () => {
//     try {
//       const res = await axios.post('/api/user/varify', {}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (res.data.success) {
//         setStatus('✅ Email Verified Successfully');
//         setTimeout(() => {
//           navigate('/login');
//         }, 2000);
//       }
//     } catch (error) {
//       console.log(error);
//       setStatus('❌ Verification failed. Please try again');
//     }
//   };

//   // Page load hote hi verification function chal jaye
//   useEffect(() => {
//     if (token) {
//       varifyEmail();
//     } else {
//       setStatus('❌ No verification token found.');
//     }
//   }, [token]);

//   return (
//     <div className='relative w-full h-[760px] bg-pink-100 overflow-hidden'>
//       <div className='min-h-screen flex items-center justify-center'>
//         <div className='bg-white p-8 rounded-2xl shadow-md text-center w-[90%] max-w-md'>
//           <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VarifyEmail;





import React, { useState, useEffect } from 'react';
import axios from "@/api/axios"; // Ensure karein ki yahan naya Render URL hai
import { useNavigate, useParams } from 'react-router-dom';

const VarifyEmail = () => {
  const [status, setStatus] = useState('Verifying your email...');
  const navigate = useNavigate();
  const { token } = useParams(); 

  const varifyEmail = async () => {
    try {
      // FIX: Backend route expect kar raha hai URL mein token: /varify/:token
      // Isliye humne baseURL + `/api/user/varify/${token}` use kiya hai
      const res = await axios.post(`/api/user/varify/${token}`);

      if (res.data.success) {
        setStatus('✅ Email Verified Successfully');
        // Success hone par 2 second baad login page par redirect
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error("Verification Error:", error);
      // Agar backend se koi specific message aaye toh wo dikhayein, nahi toh generic error
      const errorMsg = error.response?.data?.message || 'Verification failed. Please try again';
      setStatus(`❌ ${errorMsg}`);
    }
  };

  useEffect(() => {
    // Sirf tabhi function call karein jab URL mein token mil jaye
    if (token) {
      varifyEmail();
    } else {
      setStatus('❌ No verification token found.');
    }
  }, [token]);

  return (
    <div className='relative w-full h-screen bg-pink-50 flex items-center justify-center overflow-hidden'>
      <div className='bg-white p-10 rounded-3xl shadow-xl text-center w-[90%] max-w-md border border-pink-100'>
        <div className='mb-4'>
            {/* Loading spinner ya icon yahan add kar sakte hain */}
            {status.includes('Verifying') && <div className="animate-spin h-8 w-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>}
        </div>
        <h2 className='text-2xl font-bold text-gray-800 transition-all duration-300'>
            {status}
        </h2>
        {!status.includes('Successfully') && !status.includes('Verifying') && (
            <button 
                onClick={() => navigate('/register')}
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