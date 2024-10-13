/* eslint-disable react-hooks/exhaustive-deps */
import { useState, Fragment, useContext, useEffect } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import BrowseCurrenciesButton from './BrowseCurrencies';
import WalletFxns from '../services/walletServices';
import AuthContext from '../context/AuthProvider';
import WatchListCard from './WatchList';
import formatWithCommas from '../hooks/formatWithComma';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const WalletInner = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [nairaWalletInfo, setNairaWalletInfo] = useState();
  const [dollarWalletInfo, setDollarWalletInfo] = useState();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getwallets = async () => {
    try {
      const res = await WalletFxns.getWallets(auth?.token);
      if (res.response.code === 200) {
        const nairaItem = res.response.data.find(
          (item) => item.currency.type === 'Naira'
        );
        const dollarItem = res.response.data.find(
          (item) => item.currency.type === 'Dollar'
        );
        setDollarWalletInfo(dollarItem);
        setNairaWalletInfo(nairaItem);
      }
    } catch (error) {
      if (error.response.data.message === 'Unauthenticated.') {
        toast.error('Session expired');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    getwallets();
  }, []);

  const usdcWallet = {
    currency: 'USD',
    balance: dollarWalletInfo?.balance || 0,
  };
  const eurcWallet = {
    currency: 'EURO',
    balance: 0,
  };
  const nairaWallet = {
    currency: 'Naira',
    balance: nairaWalletInfo?.balance || 0,
  };
  const fiatCurrencies = [
    { name: 'USD', active: true },
    { name: 'EUR', active: false },
    { name: 'GBP', active: false },
  ];
  return (
    <div className='p-6 rounded-lg text-gray-800 shadow-2xl bg-gray-100 min-h-screen'>
      <div className=' '>
        <h2 className='text-2xl font-semibold   mb-6'>Wallets</h2>
        {/* Wallet Cards */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          {/* USDC Wallet */}
          <div className='bg-white shadow-md bg-opacilty-90 backdrop-blur-md rounded-lg p-6 flex flex-col'>
            <h3 className='text-xl font-bold text-wmhite mb-2'>USD Wallet</h3>
            <p className='text-lg text-indigo-400'>
              Balance: $ {formatWithCommas(usdcWallet.balance)}
            </p>
          </div>

          {/* EURC Wallet */}
          <div className='bg-white shadow-md opacity-60 cursor-not-allowed bg-opacitny-10 backdrop-blur-md rounded-lg p-6 flex flex-col'>
            <h3 className='text-xl font-bold text-nwhite mb-2'>EURO Wallet</h3>
            <p className='text-lg text-yellow-400 '>
              Balance: € {eurcWallet.balance}
            </p>
          </div>
          {/* Naira Wallet */}
          <div className='bg-white shadow-md bg-opacitny-10 backdrop-blur-md rounded-lg p-6 flex flex-col'>
            <h3 className='text-xl font-bold text-nwhite mb-2'>Naira Wallet</h3>
            <p className='text-lg text-green-400 '>
              Balance: ₦ {formatWithCommas(nairaWallet.balance)}
            </p>
          </div>
        </div>
        {/* Fiat Currencies Activation */}
        <div className='bg-white shadow-xl  backdrop-blur-md rounded-lg p-6 mb-8'>
          <h3 className='text-xl font-bold   mb-4'>
            Available Fiat Currencies
          </h3>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-transparent'>
              <thead>
                <tr>
                  <th className='py-2 px-4 text-left  '>Currency</th>
                  <th className='py-2 px-4 text-left  '>Status</th>
                  <th className='py-2 px-4 text-left  '>Action</th>
                </tr>
              </thead>
              <tbody>
                {fiatCurrencies.map((currency) => (
                  <tr
                    key={currency.name}
                    className='border-t border-gray-300 bg-transparent'
                  >
                    <td className='py-2 px-4  '>{currency.name}</td>
                    <td className='py-2 px-4  '>
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
        <div className='grid lg:grid-cols-12 gap-8 grid-cols-1'>
          <div className='lg:col-span-8'>
            {' '}
            {/* Fiat Wallet System */}
            <div className='bg-white shadow-xl bg-opaclity-10 backdrop-blur-md rounded-lg p-6 flex flex-col'>
              <h3 className='text-xl font-bold text-wkhite mb-2'>
                Fiat Wallet System
              </h3>
              <p className='text-gray-300 mb-4'>
                Create and manage fiat currencies. Browse available currencies
                and activate wallets to hold funds.
              </p>

              <BrowseCurrenciesButton />
            </div>
            {/* Dashboard API Section */}
            <div className='bg-white mt-8 shadow-xl  rounded-lg p-6'>
              <h3 className='text-xl font-bold   mb-1'>Dashboard API</h3>
              <p className='text-gray-400 mb-6'>
                Access your dashboard data through our secure API for seamless
                integration with your applications.
              </p>

              <>
                {/* View API Documentation Button */}
                <button
                  onClick={openModal}
                  className='flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition'
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
                      d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                    />
                  </svg>

                  <span>View API Documentation</span>
                </button>

                {/* Modal Implementation */}
                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as='div'
                    className='relative z-50'
                    onClose={closeModal}
                  >
                    {/* Overlay */}
                    <TransitionChild
                      as={Fragment}
                      enter='ease-out duration-300'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <div className='fixed inset-0 bg-black backdrop-blur-[2px] bg-opacity-30' />
                    </TransitionChild>

                    {/* Modal Panel */}
                    <div className='fixed inset-0 overflow-y-auto'>
                      <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                          as={Fragment}
                          enter='ease-out duration-300'
                          enterFrom='opacity-0 scale-95'
                          enterTo='opacity-100 scale-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100 scale-100'
                          leaveTo='opacity-0 scale-95'
                        >
                          <DialogPanel className='relative w-full max-w-md transform overflow-hidden rounded-lg bg-gradient-to-br from-[#071847] via-blue-800 to-purple-600 p-6 text-left align-middle shadow-xl transition-all'>
                            {/* Close Button */}
                            <button
                              type='button'
                              className='absolute top-3 right-3 text-white hover:text-gray-300'
                              onClick={closeModal}
                            >
                              <XMarkIcon
                                className='h-6 w-6'
                                aria-hidden='true'
                              />
                            </button>

                            {/* Modal Content */}
                            <div className='mt-4'>
                              <div className='flex items-center justify-center mb-4'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='currentColor'
                                  className='h-12 w-12 text-white'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                                  />
                                </svg>
                              </div>
                              <DialogTitle
                                as='h3'
                                className='text-lg font-medium leading-6 text-center text-white'
                              >
                                API Documentation
                              </DialogTitle>
                              <div className='mt-2'>
                                <p className='text-sm text-center text-gray-200'>
                                  Coming Soon! Stay tuned for our comprehensive
                                  API documentation to integrate seamlessly with
                                  PayZeph.
                                </p>
                              </div>
                            </div>

                            <div className='mt-4'>
                              <button
                                type='button'
                                className='w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2'
                                onClick={closeModal}
                              >
                                Close
                              </button>
                            </div>
                          </DialogPanel>
                        </TransitionChild>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </>
            </div>
          </div>
          <div className=' lg:col-span-4'>
            <WatchListCard />
          </div>
        </div>{' '}
      </div>
    </div>
  );
};

export default WalletInner;
