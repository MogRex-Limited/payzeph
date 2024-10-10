/* eslint-disable react/no-unescaped-entities */

import { Link } from 'react-router-dom';
import { N404 } from '../assets';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center min-h-screen pb-10 bg-gradient-to-br from-web3Bright-100 via-web3Bright-200 to-web3Bright-300 text-gray-100 px-4'
    >
      <img
        src={N404}
        alt='404 Illustration'
        className='w-2/3 md:w-1/2 lg:w-1/3 mb-8'
      />
      <h1 className='text-4xl font-bold mb-4'>Oops! Page Not Found</h1>
      <p className='text-lg mb-6 text-center'>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to='/dashboard'
        className='px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300'
      >
        Go to Dashboard
      </Link>
    </motion.div>
  );
};

export default NotFound;
