import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

function DashNav() {
  const { auth, setAuth } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setAuth(null);
  };

  return (
    <nav
      // style={{ width: 'calc(100vw - 16rem)' }}
      className='w-full md:w-[calc(100vw-16rem)] shadow-2xl z-10 top-0 fixed  w-fubll b,g-gray-800 p-4 bg-gradient-to-bl from-web3Bright-300 via-web3Bright-100 to-web3Bright-300'
    >
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center'>
          <div></div>

          {/* User Info */}
          <div className='relative'>
            <button
              className='flex items-center space-x-3'
              onClick={toggleDropdown}
            >
              <img
                src={auth?.avatar2 || 'https://via.placeholder.com/40'}
                alt='User Avatar'
                className='h-10 w-10 rounded-full'
              />
              <div className='text-white text-left text-sm'>
                <div>{auth?.name}</div>
                <div className='text-[11px]'>{auth?.email}</div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg'>
                <Link
                  to='/dashboard/profile'
                  className='block px-4 py-2 text-gray-700 hover:bg-[#071847] hover:rounded-t-md hover:text-white'
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className='block w-full text-left px-4 py-2 text-gray-700 hover:rounded-b-md hover:bg-[#071847] hover:text-white'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashNav;
