// src/pages/Dashboard/DashboardHome.js
// import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const WalletInner = () => {
  const zephID = 'Z5647-745';
  const usdcWallet = {
    currency: 'USDC',
    balance: 1000,
    address: '0x1234567890abcdef1234567890abcdef12345678',
  };
  const eurcWallet = {
    currency: 'EURC',
    balance: 0,
    address: 'Coming Soon',
  };
  const fiatCurrencies = [
    { name: 'USD', active: true },
    { name: 'EUR', active: true },
    { name: 'GBP', active: false },
    // Add more as needed
  ];
  return (
    <div className='p-6 rounded-lg text-gray-800 shadow-2xl bg-gray-100 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-2xl font-semibold   mb-6'>Wallets</h2>

        {/* Wallet Cards */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          {/* USDC Wallet */}
          <div className='bg-white bg-opacilty-90 backdrop-blur-md rounded-lg p-6 flex flex-col'>
            <h3 className='text-xl font-bold text-wmhite mb-2'>USDC Wallet</h3>
            <p className='text-lg text-green-400 mb-4'>
              Balance: ${usdcWallet.balance} USDC
            </p>
            <p className='text-gray-300 mb-4'>
              Address: {usdcWallet.address.slice(0, 20)}...
            </p>
            <div className='flex items-center space-x-4 mb-4'>
              <CopyToClipboard text={usdcWallet.address}>
                <button className='flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition'>
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
                  <span>Copy Address</span>
                </button>
              </CopyToClipboard>
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
            <div className='flex space-x-2'>
              <button className='flex-1 flex items-center justify-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
                  />
                </svg>
                <span>Send</span>
              </button>
              <button className='flex-1 flex items-center justify-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
                  />
                </svg>
                <span>Receive</span>
              </button>
            </div>
          </div>

          {/* EURC Wallet */}
          <div className='bg-white bg-opacitny-10 backdrop-blur-md rounded-lg p-6 flex flex-col'>
            <h3 className='text-xl font-bold text-nwhite mb-2'>EURC Wallet</h3>
            <p className='text-lg text-yellow-400 mb-4'>
              Balance: ${eurcWallet.balance} EURC
            </p>
            <p className='text-gray-300 mb-4'>Address: {eurcWallet.address}</p>
            <div className='flex items-center space-x-4 mb-4'>
              <CopyToClipboard text={eurcWallet.address}>
                <button
                  className='flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition'
                  disabled
                >
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

                  <span>Copy Address</span>
                </button>
              </CopyToClipboard>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6 text-white cursor-not-allowed'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
                />
              </svg>
            </div>
            <div className='flex space-x-2'>
              <button
                className='flex-1 flex items-center justify-center space-x-1 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition'
                disabled
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
                  />
                </svg>
                <span>Send</span>
              </button>
              <button
                className='flex-1 flex items-center justify-center space-x-1 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition'
                disabled
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
                  />
                </svg>
                <span>Receive</span>
              </button>
            </div>
          </div>

          {/* Fiat Wallet System */}
          <div className='bg-white bg-opaclity-10 backdrop-blur-md rounded-lg p-6 flex flex-col'>
            <h3 className='text-xl font-bold text-wkhite mb-2'>
              Fiat Wallet System
            </h3>
            <p className='text-gray-300 mb-4'>
              Create and manage fiat currencies. Browse available currencies and
              activate wallets to hold funds.
            </p>
            <button className='flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
                />
              </svg>
              <span>Browse Currencies</span>
            </button>
          </div>
        </div>

        {/* Fiat Currencies Activation */}
        <div className='bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 mb-8'>
          <h3 className='text-xl font-bold text-white mb-4'>
            Available Fiat Currencies
          </h3>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-transparent'>
              <thead>
                <tr>
                  <th className='py-2 px-4 text-left text-white'>Currency</th>
                  <th className='py-2 px-4 text-left text-white'>Status</th>
                  <th className='py-2 px-4 text-left text-white'>Action</th>
                </tr>
              </thead>
              <tbody>
                {fiatCurrencies.map((currency) => (
                  <tr
                    key={currency.name}
                    className='border-t border-white bg-transparent'
                  >
                    <td className='py-2 px-4 text-white'>{currency.name}</td>
                    <td className='py-2 px-4 text-white'>
                      {currency.active ? 'Active' : 'Inactive'}
                    </td>
                    <td className='py-2 px-4'>
                      {currency.active ? (
                        <button className='bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition'>
                          Deactivate
                        </button>
                      ) : (
                        <button className='bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition'>
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dashboard API Section */}
        <div className='bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 mb-8'>
          <h3 className='text-xl font-bold text-white mb-4'>Dashboard API</h3>
          <p className='text-gray-300 mb-4'>
            Access your dashboard data through our secure API for seamless
            integration with your applications.
          </p>
          <button className='flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
              />
            </svg>

            <span>View API Documentation</span>
          </button>
        </div>
      </div>
      {/* Add more dashboard widgets and information here */}
    </div>
  );
};

export default WalletInner;
