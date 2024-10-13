import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthFxns from '../../../services/authServices';
import { toast } from 'sonner';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = 'First Name is required';
    if (!formData.last_name.trim())
      newErrors.last_name = 'Last Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    } else if (!/^\d{11}$/.test(formData.phone_number)) {
      newErrors.phone_number = 'Phone number must be 11 digits';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    // if (!formData.confirmPassword) {
    //   newErrors.confirmPassword = 'Please confirm your password';
    // } else if (formData.password !== formData.confirmPassword) {
    //   newErrors.confirmPassword = 'Passwords do not match';
    // }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      setSending(true);
      const loadingToastId = toast.loading('Submitting...');
      try {
        const res = await AuthFxns.registerUser(formData);
        if (res.response.code === 200) {
          sessionStorage.setItem('zeph_email', formData.email);
          sessionStorage.setItem('zeph_token', res.response.data.token);
          sessionStorage.setItem(
            'zeph_2fa',
            res.response.data.user.two_factor_enabled
          );
          // console.log(res.response.data);
          setSending(false);
          toast.dismiss(loadingToastId);
          toast.success('Account created');
          setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            password: '',
          });
          setErrors({});
          navigate('/otp');
        }
      } catch (error) {
        setSending(false);
        toast.dismiss(loadingToastId);
        if (error.response.data.response.message === 'Invalid data') {
          const errorData = error.response.data.response.errors;
          const errorMessages = Object.keys(errorData)
            .map((field) => errorData[field].join(', '))
            .join(' ');
          toast.error(errorMessages);
        } else if (error.message & !error.response.data.response.message) {
          toast.error(error.message);
        } else {
          toast.error(error.response.data.response.message);
        }
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className='min-h-screen md:pt-24 flex items-center justify-center bg-gradient-web3'>
      <motion.div
        className='bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full text-white'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='text-3xl font-bold mb-6 text-center'>Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* First Name */}
          <div className='mb-4'>
            <label
              htmlFor='first_name'
              className='block text-sm font-medium mb-1'
            >
              First name
            </label>
            <div className='relative'>
              {/* <UserIcon className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' /> */}
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
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
              <input
                type='text'
                name='first_name'
                id='first_name'
                disabled={sending}
                value={formData.first_name}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.first_name ? 'border border-red-500' : ''
                }`}
                placeholder='John Doe'
              />
            </div>
            {errors.first_name && (
              <p className='text-red-500 text-xs mt-1'>{errors.first_name}</p>
            )}
          </div>
          {/* Last Name */}
          <div className='mb-4'>
            <label
              htmlFor='last_name'
              className='block text-sm font-medium mb-1'
            >
              Last name
            </label>
            <div className='relative'>
              {/* <UserIcon className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' /> */}
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
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
              <input
                type='text'
                name='last_name'
                id='last_name'
                disabled={sending}
                value={formData.last_name}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.last_name ? 'border border-red-500' : ''
                }`}
                placeholder='John Doe'
              />
            </div>
            {errors.last_name && (
              <p className='text-red-500 text-xs mt-1'>{errors.last_name}</p>
            )}
          </div>

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
              </svg>
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

          {/* Phone Number */}
          <div className='mb-4'>
            <label
              htmlFor='phone_number'
              className='block text-sm font-medium mb-1'
            >
              Phone Number
            </label>
            <div className='relative'>
              {/* <PhoneIcon className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' /> */}
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
                  d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
                />
              </svg>
              <input
                type='tel'
                name='phone_number'
                id='phone_number'
                disabled={sending}
                value={formData.phone_number}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone_number ? 'border border-red-500' : ''
                }`}
                placeholder='1234567890'
              />
            </div>
            {errors.phone_number && (
              <p className='text-red-500 text-xs mt-1'>{errors.phone_number}</p>
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
              </svg>
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

          {/* Submit Button */}
          <button
            type='submit'
            disabled={sending}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition duration-300'
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='text-blue-400 hover:text-blue-500 font-medium'
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
