import { useContext, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import ZephQrCode from './ZephQrCode';

const ProfileInner = () => {
  const { auth } = useContext(AuthContext);
  const [personalInfo] = useState({
    name: auth?.name || '',
    email: auth?.email || '',
    zephID: auth?.zephID || 'zddfdf',
    zephLink: auth?.zephLink || 'dfreedfr',
    zephCode: auth?.zephCode || 'e54dftr',
  });

  return (
    <div className='p-6 rounded-lg text-gray-800 shadow-xl bg-gray-100  '>
      <div className=' '>
        <h2 className='text-3xl font-semibold text-gray-900 mb-6'>Profile</h2>

        {/* User Information */}
        <div className='grid grid-cols-1 md:grid-cols-12 items-top justify-between  space-x-4 mb-8'>
          {/* User icon */}
          <div className='bg-white rounded-lg md:col-span-8 p-4 shadow-md'>
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
          <div className=' md:col-span-4'>
            <ZephQrCode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInner;
