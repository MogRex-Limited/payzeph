// src/pages/Dashboard/DashboardHome.js

import { useContext, useState } from 'react';
import AuthContext from '../../../context/AuthProvider';
import QRCode from 'react-qr-code';
import ZephQrCode from '../../../components/ZephQrCode';

const ProfileInner = () => {
  const { auth } = useContext(AuthContext);
  const [personalInfo, setPersonalInfo] = useState({
    name: auth?.name || '',
    email: auth?.email || '',
    zephID: auth?.zephID || 'zddfdf',
    zephLink: auth?.zephLink || 'dfreedfr',
    zephCode: auth?.zephCode || 'e54dftr',
  });
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFA: false,
  });

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPasswordInfo({
      ...passwordInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    // Implement personal info update logic
    console.log('Personal Info Updated:', personalInfo);
  };

  const handlePasswordInfoSubmit = (e) => {
    e.preventDefault();
    // Implement password update logic with 2FA
    console.log('Password Info Updated:', passwordInfo);
  };

  return (
    <div className='p-6 rounded-lg text-gray-800 shadow-2xl bg-gray-100  '>
      <div className=' '>
        <h2 className='text-3xl font-semibold text-gray-900 mb-6'>Profile</h2>

        {/* User Information */}
        <div className='flex items-top justify-between  space-x-4 mb-8'>
          {/* User icon */}
          <div>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-16 w-16 text-gray-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>

              <div>
                <h3 className='text-xl font-bold text-gray-600'>
                  {personalInfo.name}
                </h3>
                <p className='text-gray-400'>{personalInfo.email}</p>
              </div>
            </div>
            <div className='mt-4'>
              <p className='text-gray-900 mb-2 font-bold'>
                ZephID:{' '}
                <span className='font-medium'>{personalInfo.zephID}</span>
              </p>
              <p className='text-gray-900 mb-2 font-bold'>
                ZephLink:
                <span className='font-medium'>{personalInfo.zephLink}</span>
              </p>
              <p className='text-gray-900 mb-2 font-bold'>
                ZephCode:{' '}
                <span className='font-medium'>{personalInfo.zephCode}</span>
              </p>
            </div>
          </div>
          <div className='mb-8'>
            <ZephQrCode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInner;
