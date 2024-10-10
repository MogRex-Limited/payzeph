import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import AuthFxns from '../../../services/authServices';
import { useNavigate } from 'react-router-dom';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const email = sessionStorage.getItem('zeph_email');

  const handleSubmit = async () => {
    const otpString = otp.join('');

    if (otpString.length === 4) {
      const loadingToastId = toast.loading('Verifying otp...');

      try {
        const res = await AuthFxns.verifyOTP({
          email: email,
          type: 'verify_email',
          code: otpString,
        });
        if (res.response.code === 200) {
          setSending(false);
          toast.dismiss(loadingToastId);
          sessionStorage.removeItem('zeph_email');
          toast.success('OTP verified.');
          navigate('/login');
        }
      } catch (error) {
        setSending(false);
        toast.dismiss(loadingToastId);
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error(error.response?.data?.response.message);
        }
      }
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    const loadingToastId = toast.loading('Resending otp...');
    try {
      const res = await AuthFxns.userRequestNewOTP({
        email: email,
        type: 'verify_email',
      });
      if (res.response.code === 200) {
        setSending(false);
        setOtp(['', '', '', '']);
        toast.dismiss(loadingToastId);
        toast.success('OTP has been resent to your email.');
      }
    } catch (error) {
      setSending(false);
      toast.dismiss(loadingToastId);
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error(error.response?.data?.response.message);
      }
    }

    // Add resend OTP logic here
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen mbg-gradient-to-br mfrom-blue-800 mto-purple-600 bg-gradient-to-br from-web3Bright-100 via-web3Bright-200 to-web3Bright-300 text-white'>
      <motion.div
        className='bg-white bg-opacity-10 backdrop-blur-md flex flex-col items-center justify-center rounded-lg shadow-lg p-8 max-w-md w-full text-white'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-3xl font-bold mb-6'>OTP Verification</h1>
        <p className='mb-4'>Enter the OTP sent to your email.</p>
        <div className='flex space-x-2 mb-6'>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type='text'
              maxLength='1'
              disabled={sending}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className='w-12 h-12 text-center text-2xl text-gray-900 bg-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200'
        >
          Verify
        </button>
        <button
          onClick={handleResend}
          className='text-blue-300 hover:underline mt-4'
        >
          Resend OTP
        </button>
      </motion.div>
    </div>
  );
};

export default OTPVerificationPage;
