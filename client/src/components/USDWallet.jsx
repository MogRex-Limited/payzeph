/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Lottie from 'lottie-react';
import processingAnimation from '../assets/processing.json';
import { toast } from 'sonner';
import WalletFxns from '../services/walletServices';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const UsdWallet = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [fundCurrency, setFundCurrency] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [balance, setBalance] = useState(0);
  const [accountDetails, setAccountDetails] = useState();
  const [gettingAccount, setGettingAccount] = useState();
  const [walletInfo, setWalletInfo] = useState();

  useEffect(() => {
    setBalance(walletInfo?.balance || 0);
  }, [walletInfo]);

  const formatWithCommas = (number) => {
    return number.toLocaleString();
  };

  const openModal = () => {
    setIsModalOpen(true);
    setFundAmount('');
    setFundCurrency('');
    setIsProcessing(false);
    setIsSuccess(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getwallets = async () => {
    const res = await WalletFxns.getWallets(auth?.token);
    if (res.response.code === 200) {
      const nairaItem = res.response.data.find(
        (item) => item.currency.type === 'Dollar'
      );
      setWalletInfo(nairaItem);
    }
  };

  const getAccount = async () => {
    setGettingAccount(true);
    const formData = new FormData();
    formData.append('wallet_id', walletInfo?.id);
    try {
      const res = await WalletFxns.generateAccount(auth?.token, formData);
      if (res.response.code === 200) {
        setGettingAccount(false);
        setAccountDetails(res.response.data);
        setIsProcessing(false);
      }
    } catch (error) {
      setIsProcessing(false);
      setGettingAccount(false);
      if (error.message & !error.response.data.response.message) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.response.message);
      }
    }
  };

  useEffect(() => {
    getwallets();
  }, []);

  const handleFundSubmit = async (e) => {
    e.preventDefault();

    if (!fundAmount || !fundCurrency) {
      toast.error('Please enter amount and select currency.');
      return;
    }

    if (fundCurrency === 'Crypto') {
      toast.info('Crypto funding is coming soon!');
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('wallet_id', walletInfo?.id);
    formData.append('reference', accountDetails?.reference);
    formData.append('account_number', accountDetails?.account_number);
    formData.append('amount', parseInt(fundAmount));

    try {
      const res = await WalletFxns.fundWallet(formData, auth?.token);
      if (res.response.code === 200) {
        setIsProcessing(false);
        closeModal();
        toast.success('Funds added successfully!');
        setFundAmount('');
        getwallets();
        setBalance(walletInfo?.balance);
      }
    } catch (error) {
      if (error.response.data.message === 'Unauthenticated.') {
        toast.error('Session expired');
        navigate('/login');
      }
    }

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setBalance((prev) => prev + parseFloat(fundAmount));

      setTimeout(() => {
        closeModal();
      }, 2000);
    }, 5000);
  };

  return (
    <>
      {/* USD Wallet Card */}
      <div className='bg-white rounded-lg shadow-md p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            {/* USD Icon */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-7 w-7 text-[#2774cb] mr-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
            <div>
              <h4 className='text-lg font-semibold text-gray-700'>
                USD Wallet
              </h4>
              <p className='text-sm text-gray-500'>
                Balance: ${formatWithCommas(balance)}
              </p>
            </div>
          </div>
          <span className='text-xs font-semibold px-2.5 py-0.5'>
            <button
              onClick={() => {
                openModal();
                getAccount();
              }}
              className='bg-[#2774cb] text-white border border-[#2774cb] hover:text-[#2774cb] hover:bg-white rounded-lg px-4 py-2 font-bold transition duration-200'
            >
              Fund
            </button>
          </span>
        </div>
      </div>

      {/* Fund Modal */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            {/* Background overlay */}
            <div className='fixed inset-0 bg-black backdrop-blur-[2px] bg-opacity-30' />
          </TransitionChild>

          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <DialogPanel className='relative transform overflow-hidden rounded-lg bg-gradient-to-br from-[#071847] via-blue-800 to-purple-600 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                  {/* Close button */}
                  <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                    <button
                      type='button'
                      className='rounded-md bg-transparent text-white hover:text-gray-200 focus:outline-none'
                      onClick={closeModal}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div>
                    {!isProcessing && !isSuccess && (
                      <>
                        <DialogTitle
                          as='h3'
                          className='text-lg leading-6 font-medium text-white mb-4'
                        >
                          Fund Your USD Wallet
                        </DialogTitle>
                        <form onSubmit={handleFundSubmit} className='space-y-4'>
                          <div>
                            <label
                              className='block text-white text-sm font-medium mb-1'
                              htmlFor='amount'
                            >
                              Amount
                            </label>
                            <input
                              type='number'
                              id='amount'
                              name='amount'
                              value={fundAmount}
                              onChange={(e) => setFundAmount(e.target.value)}
                              className='w-full px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
                              placeholder='Enter amount'
                              required
                              min='1'
                            />
                          </div>
                          <div>
                            <label
                              className='block text-white text-sm font-medium mb-1'
                              htmlFor='currency'
                            >
                              Currency
                            </label>
                            <select
                              id='currency'
                              name='currency'
                              value={fundCurrency}
                              onChange={(e) => setFundCurrency(e.target.value)}
                              className='w-full px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
                              required
                            >
                              <option value='' disabled>
                                Select currency
                              </option>
                              <option value='Crypto'>Crypto</option>
                              <option value='Fiat'>Fiat</option>
                            </select>
                          </div>
                          {fundCurrency === 'Fiat' && (
                            <div>
                              <label
                                className='block text-white text-sm font-medium mb-1'
                                htmlFor='fiat'
                              >
                                Select Fiat Currency
                              </label>
                              <select
                                id='fiat'
                                name='fiat'
                                value={fundCurrency === 'Fiat' ? 'USD' : ''}
                                onChange={(e) =>
                                  setFundCurrency(e.target.value)
                                }
                                className='w-full px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
                                required
                              >
                                <option value='' disabled>
                                  Select fiat currency
                                </option>
                                <option value='USD'>USD</option>
                                <option value='Punds' disabled>
                                  Pounds Sterling (Coming Soon)
                                </option>
                              </select>
                            </div>
                          )}
                          <div className='mt-6'>
                            <button
                              type='submit'
                              className='w-full px-4 py-2 bg-[#2774cb] text-white rounded-lg hover:bg-white hover:text-[#2774cb] border border-[#2774cb] transition duration-200'
                            >
                              Fund
                            </button>
                          </div>
                        </form>
                      </>
                    )}

                    {/* Processing Animation */}
                    {isProcessing && (
                      <div className='flex flex-col items-center justify-center'>
                        <Lottie
                          animationData={processingAnimation}
                          loop={true}
                          className='w-32 h-32 mb-4'
                        />
                        <p className='text-white text-lg'>
                          {gettingAccount
                            ? 'Securing channel...'
                            : ' Processing your transaction...'}
                        </p>
                      </div>
                    )}

                    {/* Success Message */}
                    {isSuccess && (
                      <div className='flex flex-col items-center justify-center'>
                        <CheckCircleIcon className='h-16 w-16 text-green-500 mb-4' />
                        <p className='text-white text-lg'>
                          Funding Successful!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Close button for small screens */}
                  {/* {!isProcessing && !isSuccess && (
                    <div className='mt-5 sm:mt-6'>
                      <button
                        type='button'
                        className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#2774cb] text-base font-medium text-white hover:bg-white hover:text-[#2774cb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2774cb] sm:text-sm'
                        onClick={handleFundSubmit}
                      >
                        Fund
                      </button>
                    </div>
                  )} */}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UsdWallet;
