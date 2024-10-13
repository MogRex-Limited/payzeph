/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import AuthFxns from '../../services/authServices';
// import { LockClosedIcon, MailIcon } from '@heroicons/react/outline';

const Login = () => {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      setSending(true);
      const loadingToastId = toast.loading('Logging in...');
      try {
        const res = await AuthFxns.loginUser(formData);
        if (res.response.code === 200) {
          sessionStorage.setItem('zeph_token', res.response.data.token);
          sessionStorage.setItem(
            'zeph_2fa',
            res.response.data.user.two_factor_enabled
          );
          setSending(false);
          // console.log(res.response.data.user.two_factor_enabled);
          toast.dismiss(loadingToastId);

          setErrors({});
          navigate('/two-factor');
          setFormData({
            email: '',
            password: '',
          });
        }
      } catch (error) {
        setSending(false);
        toast.dismiss(loadingToastId);
        if (
          error.response.data.response.message === 'Invalid data' &&
          error.response.data.response.errors
        ) {
          const errorData = error.response.data.response.errors;
          const errorMessages = Object.keys(errorData)
            .map((field) => errorData[field].join(', '))
            .join(' ');
          toast.error(errorMessages);
        } else if (error.response.data.response.title === 'Operation failed') {
          toast.error(error.response.data.response.message);
        } else if (error.message) {
          toast.error(error.message);
        } else {
          toast.error(error.response.data.response.message);
        }
      }

      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-web3'>
      <motion.div
        className='bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full text-white'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='text-3xl font-bold mb-6 text-center'>Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-1'>
              Email Address
            </label>
            <div className='relative'>
              {/* <MailIcon className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' /> */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                />
              </svg>{' '}
              <input
                type='email'
                name='email'
                id='email'
                disabled={sending}
                value={formData.email}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border border-red-500' : ''
                }`}
                placeholder='you@example.com'
              />
            </div>
            {errors.email && (
              <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium mb-1'
            >
              Password
            </label>
            <div className='relative'>
              {/* <LockClosedIcon className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' /> */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                />
              </svg>{' '}
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                disabled={sending}
                value={formData.password}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border border-red-500' : ''
                }`}
                placeholder='********'
              />{' '}
              <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className='flex items-center justify-between mb-6'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
              <span className='ml-2 text-sm'>Remember me</span>
            </label>
            <Link
              to='/forgot-password'
              className='text-sm text-blue-400 hover:text-blue-500'
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            disabled={sending}
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition duration-300'
          >
            Login
          </button>
        </form>

        {/* Link to Register */}
        <p className='mt-4 text-center text-sm'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='text-blue-400 hover:text-blue-500 font-medium'
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
