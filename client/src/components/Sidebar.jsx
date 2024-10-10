// src/components/Sidebar.js

import { Link, useLocation } from 'react-router-dom';
import {} from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import { Logo2 } from '../assets';
import AuthContext from '../context/AuthProvider';

const Sidebar = () => {
  const location = useLocation();
  const { setAuth } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    sessionStorage.clear();
    setAuth(null);
  };

  const menuItems = [
    {
      name: 'Dashboard',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
          />
        </svg>
      ),
      path: '/dashboard',
    },

    {
      name: 'Wallets',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3'
          />
        </svg>
      ),
      path: '/dashboard/wallets',
    },
    {
      name: 'Profile',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
          />
        </svg>
      ),
      path: '/dashboard/profile',
    },
    {
      name: 'Settings',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
          />
        </svg>
      ),
      path: '/dashboard/settings',
    },
    // {
    //   name: 'Logout',
    //   icon: (
    //     <svg
    //       xmlns='http://www.w3.org/2000/svg'
    //       fill='none'
    //       viewBox='0 0 24 24'
    //       strokeWidth={1.5}
    //       stroke='currentColor'
    //       className='h-6 w-6'
    //     >
    //       <path
    //         strokeLinecap='round'
    //         strokeLinejoin='round'
    //         d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
    //       />
    //     </svg>
    //   ),
    //   path: '/logout',
    // },
  ];
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-40 md:hidden'
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`h-screen fixed z-50 top-0 lneft-0  w-64 bg-gradient-to-bl from-web3Bright-100 via-web3Bright-200 to-web3Bright-300 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:static md:z-50 md:bg-black`}
      >
        <div className='h-16 flex items-center justimfy-center bbg-indigo-900'>
          <div className='flex items-center ml-3'>
            <img src={Logo2} alt='' className='w-12 h-12 mt-1' />{' '}
            <h1 className='text-2xl font-bold'>PayZeph</h1>
          </div>
          {/* Close button for mobile */}
          <button
            className='absolute top-4 right-4 md:hidden'
            onClick={() => setIsOpen(false)}
            aria-label='Close Sidebar'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 text-white'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <nav className='flex-1 px-2 py-4 space-y-2'>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center p-2 text-base font-medium rounded-md hover:bg-indigo-700 transition ${
                location.pathname === item.path ? 'bg-indigo-700' : ''
              }`}
            >
              {item.icon}
              <span className='ml-3'>{item.name}</span>
            </Link>
          ))}
          <div
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className={`flex cursor-pointer items-center p-2 text-base font-medium rounded-md hover:bg-indigo-700 transition  `}
          >
            {' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
              />
            </svg>
            <span className='ml-3'>Logout</span>
          </div>
        </nav>
      </div>

      {/* Hamburger Menu */}
      {!isOpen && (
        <button
          className='fixed top-4 left-4 z-50 md:hidden bg-indigo-600 text-white p-2 rounded-md'
          onClick={() => {
            setIsOpen(true);
          }}
          aria-label='Open Sidebar'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        </button>
      )}
    </>
  );
  // return (
  //   <div className='h-screen fixmed top-0 z-50  w-64 bg-gradient-to-bl from-web3Bright-100 via-web3Bright-200 to-web3Bright-300   text-white flex flex-col'>
  //     <div className='h-16 flex items-center justify-center bmg-indigo-900'>
  //       <h1 className='text-2xl font-bold'>PayZeph</h1>
  //     </div>
  //     <nav className='flex-1 px-2 py-4 space-y-2'>
  //       {menuItems.map((item) => (
  //         <Link
  //           key={item.name}
  //           to={item.path}
  //           className={`flex items-center p-2 text-base font-medium rounded-md hover:bg-indigo-700 transition ${
  //             location.pathname === item.path
  //               ? 'b,g-indigo-700 bg-gradient-to-bl from-web3Bright-300   to-web3Bright-300'
  //               : ''
  //           }`}
  //         >
  //           {item.icon}
  //           <span className='ml-3'>{item.name}</span>
  //         </Link>
  //       ))}
  //     </nav>
  //   </div>
  // );
};

export default Sidebar;
