import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import ZephQrCode from './ZephQrCode';

const ProfileInner = () => {
  const { auth } = useContext(AuthContext);

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
                className='h-20 w-20 mr-6 rounded-full border-4 border-blue-500'
              />

              <div>
                <h3 className='text-xl font-bold text-gray-600'>
                  {auth?.first_name} {auth?.last_name}
                </h3>
                <p className='text-gray-400'>{auth?.email}</p>
              </div>
            </div>
            <div className='mt-6 space-y-4'>
              <p className='text-lg font-semibold text-gray-800'>
                ZephID: <span className='font-medium'>{auth?.zeph_id}</span>
              </p>
              <p className='text-lg font-semibold text-gray-800'>
                Phone number:{' '}
                <span className='font-medium'>{auth?.phone_number}</span>
              </p>
              <p className='text-lg font-semibold text-gray-800'>
                Enabled 2FA:{' '}
                <span className='font-medium'>
                  {auth?.two_factor_enabled === 1 ? 'Yes' : 'No'}
                </span>
              </p>
              <p className='text-lg font-semibold text-gray-800'>
                ZephLink:{' '}
                <span className='font-medium'>
                  https://payzeph.com/{auth?.zeph_id}
                </span>
              </p>
              <p className='text-lg font-semibold text-gray-800'>
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
