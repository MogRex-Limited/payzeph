import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import {
//   LockClosedIcon,
//   UserIcon,
//   MailIcon,
//   PhoneIcon,
// } from '@heroicons/react/24/outline';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      // Submit form (e.g., send data to backend)
      console.log('Form Submitted', formData);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
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
        <h2 className='text-3xl font-bold mb-6 text-center'>Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className='mb-4'>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium mb-1'
            >
              Full Name
            </label>
            <div className='relative'>
              <UserIcon className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' />
              <input
                type='text'
                name='fullName'
                id='fullName'
                value={formData.fullName}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fullName ? 'border border-red-500' : ''
                }`}
                placeholder='John Doe'
              />
            </div>
            {errors.fullName && (
              <p className='text-red-500 text-xs mt-1'>{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-1'>
              Email Address
            </label>
            <div className='relative'>
              <MailIcon className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' />
              <input
                type='email'
                name='email'
                id='email'
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
            <label htmlFor='phone' className='block text-sm font-medium mb-1'>
              Phone Number
            </label>
            <div className='relative'>
              <PhoneIcon className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' />
              <input
                type='tel'
                name='phone'
                id='phone'
                value={formData.phone}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border border-red-500' : ''
                }`}
                placeholder='1234567890'
              />
            </div>
            {errors.phone && (
              <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>
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
              <LockClosedIcon className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' />
              <input
                type='password'
                name='password'
                id='password'
                value={formData.password}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border border-red-500' : ''
                }`}
                placeholder='********'
              />
            </div>
            {errors.password && (
              <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className='mb-6'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium mb-1'
            >
              Confirm Password
            </label>
            <div className='relative'>
              <LockClosedIcon className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' />
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? 'border border-red-500' : ''
                }`}
                placeholder='********'
              />
            </div>
            {errors.confirmPassword && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
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
