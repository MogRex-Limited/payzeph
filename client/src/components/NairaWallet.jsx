/* eslint-disable react-hooks/exhaustive-deps */
import processingAnimation from '../assets/processing.json';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { toast } from 'sonner';
import { naira, thaiBaht } from '../assets';
import { XMarkIcon } from '@heroicons/react/24/outline';
import AuthContext from '../context/AuthProvider';
import WalletFxns from '../services/walletServices';

function NairaWallet() {
  const { auth, setAuth } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [payzephId, setPayzephId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('naira');
  const dropdownRef = useRef(null);
  const [currenciesId, setCurrenciesId] = useState('');
  // const [currencies, setCurrencies] = useState([]);
  const [walletInfo, setWalletInfo] = useState();
  const [accountDetails, setAccountDetails] = useState();

  const formatWithCommas = (number) => {
    return number.toLocaleString();
  };

  const parseNumber = (string) => {
    return parseInt(string.replace(/,/g, ''), 10);
  };

  const handleFund = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBalance(balance + parseInt(amount));
      setIsProcessing(false);
      setIsFundModalOpen(false);
      toast.success('Funds added successfully!');
      setAmount('');
    }, 3000);
  };

  const handleSend = () => {
    if (parseNumber(amount) > balance) {
      toast.error('Insufficient funds!');
      return;
    }

    if (!amount || !payzephId) {
      toast.error('Enter amount and PayZephId');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setBalance(balance - parseNumber(amount));
      setIsProcessing(false);
      setIsSendModalOpen(false);
      toast.success('Amount sent successfully!');
      setAmount('');
      setPayzephId('');
    }, 3000);
  };

  const getcurrency = async () => {
    const res = await WalletFxns.getCurrencies(auth?.token);
    if (res.response.code === 200) {
      const nairaItem = res.response.data.find((item) => item.type === 'Naira');
      const nairaId = nairaItem ? nairaItem.id : null;
      // setCurrencies(res.response.data);
      setCurrenciesId(nairaId);
    }
  };

  const getwallets = async () => {
    const res = await WalletFxns.getWallets(auth?.token);
    if (res.response.code === 200) {
      const nairaItem = res.response.data.find(
        (item) => item.currency.type === 'Naira'
      );
      console.log(nairaItem);
      setWalletInfo(nairaItem);
    }
  };

  const getAccount = async () => {
    const formData = new FormData();
    formData.append('wallet_id', walletInfo?.id);
    const res = await WalletFxns.generateAccount(auth?.token, formData);
    try {
      if (res.response.code === 200) {
        console.log(res.response.data);
        setAccountDetails(res.response.data);
        setIsProcessing(false);
      }
    } catch (error) {
      setIsProcessing(false);
      if (error.message & !error.response.data.response.message) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.response.message);
      }
    }
  };

  useEffect(() => {
    getcurrency();
    getwallets();
  }, []);
  // console.log(currencies);

  const handleActivate = async () => {
    const req = { user_id: auth?.id, currency_id: currenciesId, type: 'Fiat' };
    try {
      const res = await WalletFxns.generateWallet(auth?.token, req);
      if (res.response.code === 200) {
        const res = await WalletFxns.getWallets(auth?.token);
        if (res.response.code === 200) {
          setAuth((prevAuth) => ({
            ...prevAuth,
            wallets: res.response.data,
          }));
          setIsProcessing(false);
          setIsActivateModalOpen(false);
          toast.success('Wallet activated');
        }
      }
    } catch (error) {
      if (error.message & !error.response.data.response.message) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.response.message);
      }
    }
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  const getCurrentCurrency = () => {
    if (selectedCurrency === 'naira') {
      return { image: naira, label: 'Naira' };
    }
    return { image: thaiBaht, label: 'Thai Baht' };
  };

  const currentCurrency = getCurrentCurrency();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const isOnlyUSDCandUSD = auth.wallets.every(
    (wallet) => wallet.currency.short_name === 'USD'
  );

  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <div className='flex items-center  justify-between'>
        <div className='relative'>
          <div
            className='flex items-center cursor-pointer'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onMouseEnter={() => setIsDropdownOpen(true)}
          >
            {!isOnlyUSDCandUSD && (
              <img
                src={currentCurrency.image}
                alt={currentCurrency.label}
                className={`h-7 w-7  {currentCurrency === 'naira' ? 'border p-1 rounded-full border-slate-900' : ''}  text-[#25b471] mr-2`}
              />
            )}
            <div className={`${isOnlyUSDCandUSD ? 'ml-9' : ''}`}>
              <h4 className='text-lg font-semibold text-gray-700'>
                {isOnlyUSDCandUSD ? 'Fiat' : currentCurrency.label} Wallet
              </h4>
              {!isOnlyUSDCandUSD && (
                <p className='text-sm text-gray-500'>
                  Balance: {currentCurrency.label === 'Naira' ? '₦' : '฿'}
                  {formatWithCommas(balance)}
                </p>
              )}
            </div>
          </div>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className='absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg'
            >
              <ul className='py-1'>
                <li
                  onClick={() => handleCurrencySelect('naira')}
                  className='px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer flex items-center'
                >
                  <img
                    src={naira}
                    alt='Naira'
                    className='h-6 w-6 mr-2 border p-1 rounded-full'
                  />
                  Naira
                </li>
                <li
                  onClick={() => handleCurrencySelect('thaiBaht')}
                  className='px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer flex items-center'
                >
                  <img
                    src={thaiBaht}
                    alt='Thai Baht'
                    className='h-6 w-6 mr-2 border p-1 rounded-full'
                  />
                  Thai Baht
                </li>
              </ul>
            </div>
          )}{' '}
        </div>
        {isOnlyUSDCandUSD ? (
          <span className='text-xs flex lgm:flex-col 2xl:block 2xl:flex-col 2xl:gap-3 gap-3 font-semibold lg:pr-2.5  '>
            <button
              onClick={() => {
                setIsActivateModalOpen(true);
                setIsProcessing(true);
                handleActivate();
              }}
              className='bg-yellow-500 lg:w-fit w-full text-white border border-yellow-500 hover:text-yellow-500 hover:bg-white rounded-lg px-4 py-2 font-bold'
            >
              Activate
            </button>
          </span>
        ) : (
          <span className='text-xs flex lgm:flex-col 2xl:block 2xl:flex-col 2xl:gap-3 gap-3 font-semibold lg:pr-2.5  '>
            <button
              onClick={() => {
                setIsFundModalOpen(true);
                setIsProcessing(true);
                getAccount();
              }}
              className='bg-[#25b471] lg:w-fit w-full text-white border border-[#25b471] hover:text-[#25b471] hover:bg-white rounded-lg px-4 py-2 font-bold'
            >
              Fund
            </button>

            <button
              onClick={() => setIsSendModalOpen(true)}
              className={`xl:ml-3 bg-purple-500 text-white border border-purple-500 hover:text-purple-500 hover:bg-white rounded-lg px-4 py-2 font-bold ${
                balance === 0
                  ? 'opacity-30 pointer-events-none'
                  : 'opacity-100 pointer-events-auto'
              }`}
            >
              Send
            </button>
          </span>
        )}
      </div>

      {/* Activate Modal */}
      <Transition appear show={isActivateModalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50'
          onClose={() => setIsActivateModalOpen(false)}
        >
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
                      onClick={() => setIsActivateModalOpen(false)}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>{' '}
                  {isProcessing && (
                    <div className='flex flex-col items-center justify-center'>
                      <Lottie
                        animationData={processingAnimation}
                        loop={true}
                        className='w-32 h-32 mb-4'
                      />
                      <p className='text-white text-lg'>
                        Activating fiat wallet...
                      </p>
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Fund Modal */}
      <Transition appear show={isFundModalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50'
          onClose={() => setIsFundModalOpen(false)}
        >
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
                      onClick={() => setIsFundModalOpen(false)}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>{' '}
                  {!isProcessing && accountDetails && (
                    <>
                      {' '}
                      <DialogTitle
                        as='h3'
                        className='text-lg leading-6 font-medium text-white mb-4'
                      >
                        Fund Wallet
                      </DialogTitle>
                      <div className='mt-2'>
                        <input
                          type='number'
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className='w-full px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
                          placeholder='Enter amount'
                        />
                      </div>
                    </>
                  )}
                  {isProcessing && (
                    <div className='flex flex-col items-center justify-center'>
                      <Lottie
                        animationData={processingAnimation}
                        loop={true}
                        className='w-32 h-32 mb-4'
                      />
                      <p className='text-white text-lg'>
                        Processing your transaction...
                      </p>
                    </div>
                  )}
                  {!isProcessing && (
                    <div className='mt-10'>
                      <button
                        disabled={isProcessing}
                        type='button'
                        className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#2774cb] text-base font-medium text-white hover:bg-white hover:text-[#2774cb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2774cb] sm:text-sm'
                        onClick={handleFund}
                      >
                        Fund
                      </button>
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Send Modal */}
      <Transition appear show={isSendModalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50'
          onClose={() => setIsSendModalOpen(false)}
        >
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

          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <DialogPanel className='relative transform overflow-hidden rounded-lg bg-gradient-to-br from-[#071847] via-blue-800 to-purple-600 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                  {/* Close button */}
                  <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                    <button
                      type='button'
                      className='rounded-md bg-transparent text-white hover:text-gray-200 focus:outline-none'
                      onClick={() => setIsSendModalOpen(false)}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>{' '}
                  {!isProcessing && (
                    <>
                      <DialogTitle
                        as='h3'
                        className='text-lg leading-6 font-medium text-white mb-4'
                      >
                        Send Money
                      </DialogTitle>
                      <div className='mt-2'>
                        <input
                          type='number'
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className='w-full px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4'
                          placeholder='Enter amount'
                        />
                        <input
                          type='text'
                          value={payzephId}
                          onChange={(e) => setPayzephId(e.target.value)}
                          className='w-full px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
                          placeholder='Enter PayZephID'
                        />
                      </div>
                    </>
                  )}
                  {isProcessing && (
                    <div className='flex flex-col items-center justify-center'>
                      <Lottie
                        animationData={processingAnimation}
                        loop={true}
                        className='w-32 h-32 mb-4'
                      />
                      <p className='text-white text-lg'>
                        Processing your transaction...
                      </p>
                    </div>
                  )}
                  {!isProcessing && (
                    <div className='mt-10'>
                      <button
                        disabled={isProcessing}
                        type='button'
                        className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#2774cb] text-base font-medium text-white hover:bg-white hover:text-[#2774cb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2774cb] sm:text-sm'
                        onClick={handleSend}
                      >
                        Send
                      </button>
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default NairaWallet;
