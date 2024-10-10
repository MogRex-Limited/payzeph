// src/pages/Dashboard/DashboardHome.js

import { useContext, useEffect } from 'react';
// import { ClipboardIcon, LinkIcon } from '@heroicons/react/outline';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
// import {
//   CurrencyDollarIcon,
//   CreditCardIcon,
//   BanknotesIcon,
// } from '@heroicons/react/24/outline';
import AuthContext from '../../../context/AuthProvider';
import { toast } from 'sonner';

const DashboardHome = () => {
  const { auth } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const zephID = auth?.zephID || 'Z5647-745';
  const zephLink = `https://payzeph.com/${zephID}`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy2 = () => {
    setCopied2(true);
    setTimeout(() => setCopied2(false), 2000);
  };

  useEffect(() => {
    if (copied || copied2) {
      toast.success('Copied');
      setCopied(false);
      toast.dismiss();
    }
  }, [copied, copied2]);

  return (
    <div className='p-6 rounded-lg shadow-2xl bg-gray-100 min-h-screen'>
      {/* Welcome Section */}
      <div className='flex justify-between items-center gap-10'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-gray-800'>
            Welcome, {auth?.name || 'User'}!
          </h2>
          <p className='text-gray-600'>
            Manage your account and transactions seamlessly.
          </p>
        </div>{' '}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6  mb-8'>
          {/* ZephID */}

          <div className='bg-indigo-500 text-white rounded-lg p-3 flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-8 w-8 text-white mr-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z'
              />
            </svg>
            <div className='flex-1'>
              <h3 className='text-xl font-bold'>Your ZephID</h3>
              {/* <p className='text-lg'>Z5647-745</p> */}
              <div className='flex items-center'>
                <span className='text-gray-200 font-mono'>{zephID}</span>
                <CopyToClipboard text={zephID} onCopy={handleCopy}>
                  <button className='ml-2 text-gray-500 hover:text-gray-700'>
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
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
          {/* ZephLink */}

          <div className='bg-red-500 text-white rounded-lg p-3 flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-8 w-8 text-white mr-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244'
              />
            </svg>
            <div className='flex-1'>
              <h3 className='text-xl font-bold p-0 m-0'>Your ZephLink</h3>
              {/* <p className='text-lg'>Z5647-745</p> */}
              <div className='flex items-center'>
                <a
                  href={zephLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-200 p-0 m-0 font-mono text-[11px] hover:underline'
                >
                  {/* {zephLink.slice(0, 20)} */}
                  {zephLink}
                </a>
                <CopyToClipboard text={zephLink} onCopy={handleCopy2}>
                  <button className='ml-2 text-gray-500 hover:text-gray-700'>
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
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Wallet Overview */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {/* USDC Wallet */}
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6 text-green-500 mr-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>

              <h4 className='text-lg font-semibold text-gray-700'>
                USDC Wallet
              </h4>
            </div>
            <span className='bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5'></span>
          </div>
        </div>
      </div>{' '}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6  mb-8'>
        {/* Fund Transfer Section */}
        <div className='bg-green-500 text-white rounded-lg p-3 flex items-center'>
          <h3 className='text-xl font-bold flex-1'>Fund Transfer</h3>
          <button className='bg-white text-green-500 rounded-lg px-4 py-2 font-bold'>
            Send Money
          </button>
        </div>
        {/* USDC Wallet Section */}
        <div className='bg-blue-500 text-white rounded-lg p-3 flex items-center'>
          <div className='flex-1'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-10 w-10 text-white mr-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <div>
                <h3 className='text-xl font-bold'>USDC Wallet</h3>
                <p className='text-lg'>Balance: $1000</p>
              </div>
            </div>
          </div>
          <button className='bg-white text-blue-500 rounded-lg px-4 py-2 font-bold'>
            Manage
          </button>
        </div>
      </div>
      <div className='mb-8'>
        <div className='bg-white rounded-lg shadow p-6 flex flex-col items-center'>
          <h3 className='text-lg font-semibold text-gray-700 mb-4'>
            ZephCode QR
          </h3>
          <QRCode
            value={zephLink}
            size={200}
            bgColor='#ffffff'
            fgColor='#6366F1'
            level='H'
            includeMargin={true}
          />
          <p className='mt-4 text-gray-600 text-center'>
            Scan this QR code to make a payment to your ZephID.
          </p>
        </div>
      </div>
      {/* <div className='bg-gray-100 min-h-screen p-6'>
        <div className='max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-3xl font-semibold mb-4'>Dashboard</h2>
          <p className='text-gray-600 mb-6'>
            Welcome to your Payzeph dashboard! Here you can manage your
            activities.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            ZephID Section
            <div className='bg-indigo-500 text-white rounded-lg p-4 flex items-center'>
              <div className='flex-1'>
                <h3 className='text-xl font-bold'>Your ZephID</h3>
                <p className='text-lg'>Z5647-745</p>
              </div>
            </div>

            USDC Wallet Section
            <div className='bg-green-500 text-white rounded-lg p-4 flex items-center'>
              <div className='flex-1'>
                <h3 className='text-xl font-bold'>USDC Wallet</h3>
                <p className='text-lg'>Balance: $1000</p>
              </div>
              <button className='bg-white text-green-500 rounded-lg px-4 py-2 font-bold'>
                Manage
              </button>
            </div>

            EURC Wallet Section
            <div className='bg-yellow-500 text-white rounded-lg p-4 flex items-center'>
              <div className='flex-1'>
                <h3 className='text-xl font-bold'>EURC Wallet</h3>
                <p className='text-lg'>Coming Soon</p>
              </div>
            </div>

            Fund Transfer Section
            <div className='bg-blue-500 text-white rounded-lg p-4 flex items-center'>
              <h3 className='text-xl font-bold flex-1'>Fund Transfer</h3>
              <button className='bg-white text-blue-500 rounded-lg px-4 py-2 font-bold'>
                Send Money
              </button>
            </div>

            QR Code Section
            <div className='bg-purple-500 text-white rounded-lg p-4 flex items-center'>
              <div className='flex-1'>
                <h3 className='text-xl font-bold'>Your ZephCode</h3>
                Placeholder for QR code
                <div className='bg-white h-24 w-24 flex items-center justify-center rounded-lg shadow-md'>
                  <p>QR Code Here</p>
                </div>
              </div>
            </div>

            ZephLink Section
            <div className='bg-red-500 text-white rounded-lg p-4 flex items-center'>
              <div className='flex-1'>
                <h3 className='text-xl font-bold'>Your ZephLink</h3>
                <p className='text-lg'>payzeph.com/Z5647-745</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardHome;
