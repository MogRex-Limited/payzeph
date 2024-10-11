import { useContext, useState } from 'react';
import AuthContext from '../context/AuthProvider';

const EditPersonal = () => {
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
    console.log('Personal Info Updated:', personalInfo);
  };

  const handlePasswordInfoSubmit = (e) => {
    e.preventDefault();
    console.log('Password Info Updated:', passwordInfo);
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
            Change Password
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
