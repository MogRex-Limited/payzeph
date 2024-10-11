/* eslint-disable react/no-unescaped-entities */

import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className=' flex-grow'>
      {/* Section 1: Hero */}
      <section
        className='bg-cover  bg-no-repeat bg-center '
        style={{
          backgroundImage: `url(https://i.ibb.co/L5q8SJ9/PayZeph2.png`,
        }}
      >
        <div className='bg-[#071847] bg-opacity-85 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20'>
          <motion.h1
            className='text-5xl md:text-7xl font-bold mb-4 '
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to PayZeph
          </motion.h1>
          <motion.p
            className='text-lg md:text-xl max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Access digital dollars globally with ease and financial stability.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            href='/register'
            className='mt-8 px-6 py-2 bg-blue-600 rounded-lg text-lg hover:bg-blue-500 transition duration-300 animate-bounce'
          >
            Get Started
          </motion.a>
        </div>
      </section>

      {/*  About Section */}
      <section
        id='about'
        className='py-20 bg-gradient-to-tr from-web3Bright-300 via-web3Bright-200 to-web3Bright-100'
      >
        <div className='max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2 animate-slide-in-left'>
            <img
              src='https://via.placeholder.com/400'
              alt='About PayZeph'
              className='rounded-lg shadow-lg'
            />
          </div>
          <div className='md:w-1/2 mt-8 md:mt-0 md:pl-12 animate-slide-in-right'>
            <h2 className='text-4xl font-bold mb-4'>About PayZeph</h2>
            <p className='mb-4'>
              PayZeph is a cutting-edge platform designed to provide seamless
              access to digital dollars globally. Our mission is to empower
              individuals and businesses to transact with ease and security in
              the digital economy.
            </p>
            <p>
              Leveraging the latest Web3 technologies, PayZeph ensures that your
              financial transactions are not only efficient but also highly
              secure.
            </p>
          </div>
        </div>
      </section>
      {/* Section 2: Why PayZeph */}
      <section className='py-20 flex flex-col justify-center items-center px-4 bg-opacity-50 bg-gray-500'>
        <motion.div
          className='text-center'
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className='text-4xl font-bold mb-4'>Why PayZeph?</h2>
          <p className='text-lg max-w-lg mx-auto'>
            PayZeph allows you to access digital dollars from anywhere in the
            world, promoting financial independence without traditional banking
            systems.
          </p>
        </motion.div>
      </section>
      {/* Features Section */}
      <section className='py-20  '>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-12 animate-fade-in'>
            Features
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {/* Feature 1 */}
            <div className='bg-gray-100 text-[#071847] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300'>
              <h3 className='text-2xl font-semibold mb-4'>Global Access</h3>
              <p>
                Seamlessly access your digital dollars from anywhere in the
                world with our secure platform.
              </p>
            </div>
            {/* Feature 2 */}
            <div className='bg-gray-100 text-[#071847] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300'>
              <h3 className='text-2xl font-semibold mb-4'>
                Secure Transactions
              </h3>
              <p>
                Your transactions are protected with state-of-the-art security
                measures ensuring peace of mind.
              </p>
            </div>
            {/* Feature 3 */}
            <div className='bg-gray-100 text-[#071847] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300'>
              <h3 className='text-2xl font-semibold mb-4'>
                Real-Time Tracking
              </h3>
              <p>
                Monitor your digital dollar transactions in real-time with our
                intuitive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 bg-gradient-to-r from-web3Bright-200 to-web3Bright-300'>
        <div className='max-w-6xl mx-auto px-4'>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className='text-4xl font-bold text-center mb-3 animate-fade-in'
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className=' text-center mb-12 animate-fade-in'
          >
            Hear what our satisfied users are saying about PayZeph.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className='flex flex-col md:flex-row text-center  justify-center items-center md:space-x-8 space-y-8 md:space-y-0'
          >
            {/* Testimonial 1 */}
            <div className='bg-web3Dark-300 p-6 rounded-lg shadow-lg max-w-sm transform hover:translate-y-2 transition duration-300'>
              <p className='mb-4'>
                "PayZeph has revolutionized the way I handle my digital
                transactions. It's fast, secure, and incredibly user-friendly."
              </p>
              <h4 className='font-semibold'>- Alex Johnson</h4>
            </div>
            {/* Testimonial 2 */}
            <div className='bg-web3Dark-300 p-6 rounded-lg shadow-lg max-w-sm transform hover:translate-y-2 transition duration-300'>
              <p className='mb-4'>
                "The real-time tracking feature is a game-changer. I always stay
                updated with my transactions effortlessly."
              </p>
              <h4 className='font-semibold'>- Maria Garcia</h4>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        id='contact'
        className='py-20 bg-gradient-to-bl from-web3Bright-100 via-web3Bright-200 to-web3Bright-300'
      >
        <div className='max-w-6xl mx-auto px-4 text-center'>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className='text-4xl font-bold mb-4 animate-fade-in'
          >
            Join PayZeph Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className='mb-8'
          >
            Start your journey towards seamless and secure digital transactions.
            Experience the future of payments with PayZeph.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            href='/register'
            className='mt-6 py-3 px-8 bg-web3Bright-100 rounded-lg hover:bg-white hover:text-[#071847] hover:font-bold transition duration-300 animate-pulse'
          >
            Sign Up Now
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default Home;
