const Misc = () => {
  return (
    <div>
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
  );
};

export default Misc;
