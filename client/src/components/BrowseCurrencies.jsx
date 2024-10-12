import { Fragment, useState } from 'react';
import {
  Description,
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function BrowseCurrenciesButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to trigger the modal */}
      <button
        className='flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition'
        onClick={() => setIsOpen(true)}
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
        <span>Browse Currencies</span>
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          //   open={isOpen}
          as='div'
          onClose={() => setIsOpen(false)}
          className='relative z-50'
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
                <DialogPanel className='relative w-full max-w-md transform overflow-hidden rounded-lg bg-gradient-to-br from-[#071847] via-blue-800 to-purple-600 p-6 text-left align-middle shadow-xl transition-all'>
                  {/* Close Button */}
                  <button
                    type='button'
                    className='absolute top-3 right-3 text-white hover:text-gray-300'
                    onClick={() => setIsOpen(false)}
                  >
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>

                  {/* Content */}
                  <DialogTitle
                    as='h3'
                    className='text-lg leading-6 font-medium text-center text-white my-4'
                  >
                    Coming Soon
                  </DialogTitle>
                  <Description
                    as='p'
                    className='text-sm leading-6 text-center  text-gray-200 mb-4'
                  >
                    This feature is currently under development. Stay tuned for
                    updates!
                  </Description>
                  <div className='mt-4 flex justify-end'>
                    <button
                      className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#2774cb] text-base font-medium text-white hover:bg-white hover:text-[#2774cb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2774cb] sm:text-sm'
                      onClick={() => setIsOpen(false)}
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
  );
}

export default BrowseCurrenciesButton;
