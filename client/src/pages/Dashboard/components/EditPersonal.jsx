// src/pages/Dashboard/DashboardHome.js

import { useContext, useState } from 'react';
import AuthContext from '../../../context/AuthProvider';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const EditPersonal = () => {
  const zephID = 'Z5647-745';
  const { auth } = useContext(AuthContext);
  const [personalInfo, setPersonalInfo] = useState({
    name: auth?.name || '',
    email: auth?.email || '',
  });
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFA: auth?.twoFA || false,
  });
  const [twoFAEnabled, setTwoFAEnabled] = useState(auth?.twoFA || false);

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

  const toggleTwoFA = () => {
    setTwoFAEnabled(!twoFAEnabled);
    setPasswordInfo({ ...passwordInfo, twoFA: !twoFAEnabled });
  };

  return (
    <div className='p-6 rounded-lg text-gray-800 shadow-2xl bg-gray-100 min-h-screen'>
      <div className=' '>
        <h2 className='text-3xl font-semibold text-gray-900 mb-6'>Settings</h2>

        {/* Edit Personal Information */}
        <form onSubmit={handlePersonalInfoSubmit} className='mb-10'>
          <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
            Edit Personal Information
          </h3>
          <div className='space-y-4'>
            <div>
              <label className='block text-gray-900 mb-1' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                value={personalInfo.name}
                onChange={handlePersonalInfoChange}
                className='w-full px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
            </div>
            <div>
              <label className='block text-gray-900 mb-1' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
                className='w-full px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
            </div>
            <button
              type='submit'
              className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 transition'
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Edit Password and 2FA */}
        <form onSubmit={handlePasswordInfoSubmit}>
          <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
            Change Password & 2FA
          </h3>
          <div className='space-y-4'>
            <div>
              <label
                className='block text-gray-900 mb-1'
                htmlFor='currentPassword'
              >
                Current Password
              </label>
              <input
                type='password'
                name='currentPassword'
                id='currentPassword'
                value={passwordInfo.currentPassword}
                onChange={handlePasswordInfoChange}
                className='w-full px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
            </div>
            <div>
              <label className='block text-gray-900 mb-1' htmlFor='newPassword'>
                New Password
              </label>
              <input
                type='password'
                name='newPassword'
                id='newPassword'
                value={passwordInfo.newPassword}
                onChange={handlePasswordInfoChange}
                className='w-full px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
            </div>
            <div>
              <label
                className='block text-gray-900 mb-1'
                htmlFor='confirmPassword'
              >
                Confirm New Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                value={passwordInfo.confirmPassword}
                onChange={handlePasswordInfoChange}
                className='w-full px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                name='twoFA'
                id='twoFA'
                checked={twoFAEnabled}
                onChange={toggleTwoFA}
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />
              <label htmlFor='twoFA' className='ml-2 block text-white'>
                Enable Two-Factor Authentication (2FA)
              </label>
            </div>
            {twoFAEnabled && (
              <div className='flex flex-col items-center mb-4'>
                <QRCode
                  value={zephID}
                  size={128}
                  bgColor='#ffffff00'
                  fgColor='#ffffff'
                />
                <div className='flex items-center space-x-4 mt-4'>
                  <CopyToClipboard text={zephID}>
                    <button className='flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition'>
                      {/* copy icon */}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184'
                        />
                      </svg>
                      <span>Copy Code</span>
                    </button>
                  </CopyToClipboard>
                  {/* share icon */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6 text-white cursor-pointer'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
                    />
                  </svg>
                </div>
              </div>
            )}
            <button
              type='submit'
              className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 transition'
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonal;
