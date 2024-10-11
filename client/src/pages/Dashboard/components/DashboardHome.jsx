// src/pages/Dashboard/DashboardHome.js

import { useContext, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import AuthContext from '../../../context/AuthProvider';
import { toast } from 'sonner';
import { naira } from '../../../assets';
import ZephQrCode from '../../../components/ZephQrCode';
import TransactionTable from '../../../components/TransactionTable';
import UsdWallet from '../../../components/USDWallet';

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
    <div className='p-6  rounded-lg shadow-2xl bg-gray-100  '>
      {/* Welcome Section */}
      <div className='flex justify-between lg:items-start xl:items-center lg:flex-row flex-col lg:gap-10'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-gray-800'>
            Welcome, {auth?.name || 'User'}!
          </h2>
          <p className='text-gray-600'>
            Manage your account and transactions seamlessly.
          </p>
        </div>{' '}
        <div className='grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2   gap-6  mb-8'>
          {/* ZephID */}

          <div className='bg-indigo-500 shadow-lg text-white rounded-lg p-3 flex items-center'>
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

          <div className='bg-red-500 shadow-lg text-white rounded-lg p-3 flex items-center'>
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
      <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6 mb-8'>
        {/* USD Wallet */}

        <UsdWallet />

        {/* Euro wallet */}
        <div className='bg-white rounded-lg shadow-md p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-7 w-7 text-[#25b471] mr-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>

              <div>
                <h4 className='text-lg font-semibold text-gray-700'>
                  Euro Wallet
                </h4>
                <p className='text-sm text-gray-500'>Balance: €0</p>
              </div>
            </div>
            <span className='  text-xs font-semibold px-2.5 py-0.5'>
              <button className='bg-[#25b471] opacity-30 pointer-events-none cursor-not-allowed text-white border border-[#25b471] hover:text-[#25b471] hover:bg-white rounded-lg px-4 py-2 font-bold'>
                Coming soon
              </button>
            </span>
          </div>
        </div>

        {/* Naira wallet */}
        <div className='bg-white rounded-lg shadow-md p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <img src={naira} alt='' className='h-7 w-7 text-[#25b471] mr-2' />

              <div>
                <h4 className='text-lg font-semibold text-gray-700'>
                  Naira Wallet
                </h4>
                <p className='text-sm text-gray-500'>Balance: ₦1000</p>
              </div>
            </div>
            <span className='  text-xs font-semibold px-2.5 py-0.5'>
              <button className='bg-[#25b471] text-white border border-[#25b471] hover:text-[#25b471] hover:bg-white rounded-lg px-4 py-2 font-bold'>
                Activate
              </button>
            </span>
          </div>
        </div>
      </div>{' '}
      <div className='grid grid-cols-1 xl:grid-cols-12 gap-6  mb-6'>
        <div className=' col-span-8'>
          <TransactionTable />
        </div>
        <div className='c col-span-8 xl:col-span-4'>
          <ZephQrCode />{' '}
          <div className=' bg-white rounded-lg my-10 shadow-md p-6'>
            <div className='flex items-start'>
              {/* Security Icon */}

              <div className='flex-1'>
                <h3 className='text-xl font-bold mb-6 text-gray-800'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6 text-[#071847d1] mr-2 inline-block'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                    />
                  </svg>
                  Enhanced Security
                </h3>
                <p className='text-gray-600 mt-2'>
                  To protect your funds and prevent unauthorized access to your
                  account, we enforce Two-Factor Authentication (2FA) at all
                  logins. 2FA adds an extra layer of security by requiring a
                  unique verification code in addition to your password.
                </p>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-lg  shadow-md p-6'>
            <div className='flex items-start'>
              {/* Support Icon */}

              <div className='flex-1'>
                <h3 className='text-xl font-bold text-gray-800'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke='currentColor'
                    className='h-6 w-6 text-[#071847d1] mr-2 inline-block'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46'
                    />
                  </svg>
                  24/7 Customer Support
                </h3>
                <p className='text-gray-600 mt-2'>
                  Our dedicated customer support team is available around the
                  clock to assist you with any questions or issues. Whether
                  it&apos;s day or night, we&apos;re here to ensure your
                  experience is smooth and your concerns are addressed promptly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='  bg-white rounded-lg shadow-md p-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'></div>
      </div>
    </div>
  );
};

export default DashboardHome;
