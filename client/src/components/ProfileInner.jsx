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
  console.log(auth);

  return (
    <div className='p-6 rounded-lg text-gray-800 shadow-xl bg-gray-100  '>
      <div className=' '>
        <h2 className='text-3xl font-semibold text-gray-900 mb-6'>Profile</h2>

        {/* User Information */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-12 items-top justify-between    mb-8'>
          <div className='bg-white rounded-lg md:col-span-8 p-4 shadow-md'>
            <div className='flex items-center'>
              <img
                src={auth?.avatar2 || 'https://via.placeholder.com/40'}
                alt='User Avatar'
                className='h-16 w-16 mr-3 rounded-full'
              />

              <div>
                <h3 className='text-xl font-bold text-gray-600'>
                  {auth?.first_name} {auth?.last_name}
                </h3>
                <p className='text-gray-400'>{auth?.email}</p>
              </div>
            </div>
            <div className='mt-4'>
              <p className='text-gray-900 mb-2 font-bold'>
                ZephID: <span className='font-medium'>{auth?.zeph_id}</span>
              </p>
              <p className='text-gray-900 mb-2 font-bold'>
                Phone number:{' '}
                <span className='font-medium'>{auth?.phone_number}</span>
              </p>
              <p className='text-gray-900 mb-2 font-bold'>
                Enabled 2FA:{' '}
                <span className='font-medium'>
                  {auth?.two_factor_enabled === 1 ? 'Yes' : 'No'}
                </span>
              </p>
              <p className='text-gray-900 mb-2 font-bold'>
                ZephLink:{' '}
                <span className='font-medium'>
                  https://payzeph.com/{auth?.zeph_id}
                </span>
              </p>
              <p className='text-gray-900 mb-2 font-bold'>
                No. of active wallets:{' '}
                <span className='font-medium'>{auth?.wallets.length}</span>
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
