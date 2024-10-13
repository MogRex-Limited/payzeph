import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import AuthFxns from '../../../services/authServices';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthProvider';

const TwoFA = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const [isGenerated, setGenerated] = useState();
  const { setAuth } = useContext(AuthContext);

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

  const token = sessionStorage.getItem('zeph_token');
  const hasenabled2fa = sessionStorage.getItem('zeph_2fa');

  const generateSecret = async () => {
    const loadingToastId = toast.loading('Generating secret...');

    try {
      setSending(true);

      const res = await AuthFxns.generate2FA(token);
      if (res.response.code === 200) {
        toast.dismiss(loadingToastId);
        setImg(res.response.data.qr_code);
        setGenerated(true);
        setSending(false);
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
  };

  const getRandomSingleDigit = Math.floor(Math.random() * 10);

  const handleSubmit = async () => {
    const otpString = otp.join('');

    if (otpString.length === 6) {
      const loadingToastId = toast.loading('Verifying otp...');

      try {
        setSending(true);
        const res = await AuthFxns.verify2FA(
          {
            otp: otpString,
          },
          token
        );
        if (res.response.code === 200) {
          setSending(false);
          toast.dismiss(loadingToastId);
          toast.success('OTP verified.');
          setOtp(['', '', '', '', '', '']);
          // console.log(res.response.data);
          setAuth({
            ...res.response.data,
            token: token,
            success: true,
            avatar2: `https://i.pravatar.cc/150?img=${getRandomSingleDigit}`,
          });
          setTimeout(() => {
            sessionStorage.removeItem('zeph_token');
            sessionStorage.removeItem('zeph_2fa');
          }, 2000);
          navigate('/dashboard');
        }
      } catch (error) {
        setSending(false);
        toast.dismiss(loadingToastId);
        if (error.message & !error.response.data.response.message) {
          toast.error(error.message);
        } else {
          toast.error(error.response.data.response.message);
        }
      }
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen mbg-gradient-to-br mfrom-blue-800 mto-purple-600 bg-gradient-to-br from-web3Bright-100 via-web3Bright-200 to-web3Bright-300 text-white'>
      <motion.div
        className='bg-white bg-opacity-10 backdrop-blur-md flex flex-col items-center justify-center rounded-lg shadow-lg p-8 max-w-xl w-full text-white'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-3xl font-bold mb-6'>Two-Factor Authentication</h1>
        <p className='mb-8 text-center'>
          {hasenabled2fa === '1'
            ? 'Please enter code from your Authenticator to login.'
            : 'Please scan the qr code with your Authenticator and enter code to login.'}
        </p>

        {(hasenabled2fa === 'null' || hasenabled2fa === '0') && (
          <>
            {!isGenerated && (
              <button
                disabled={sending}
                onClick={generateSecret}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200'
              >
                Generate secret
              </button>
            )}

            {img && (
              <div className='bg-white p-3 mb-10 rounded-lg shadow-md'>
                <img src={img} />
              </div>
            )}

            {isGenerated && (
              <>
                <div className='flex space-x-2 sm:space-x-6 my-2'>
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
                  disabled={sending}
                  onClick={handleSubmit}
                  className='bg-blue-500 mt-4 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200'
                >
                  Sumbit
                </button>
              </>
            )}
          </>
        )}

        {hasenabled2fa === '1' && (
          <>
            {' '}
            <div className='flex space-x-6 my-2'>
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
              disabled={sending}
              onClick={handleSubmit}
              className='bg-blue-500 mt-4 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200'
            >
              Sumbit
            </button>
          </>
        )}

        {/*   <button
          onClick={handleResend}
          className='text-blue-300 hover:underline mt-4'
        >
          Resend OTP
        </button> */}
      </motion.div>
    </div>
  );
};

export default TwoFA;
