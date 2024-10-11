/* eslint-disable react/prop-types */

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';

const TransactionModal = ({ transaction, isOpen, closeModal }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
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
          <div className='flex items-center justify-center min-h-full p-4 text-center sm:p-0'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <DialogPanel className='relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6'>
                {/* Close button */}
                <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                  <button
                    type='button'
                    className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none'
                    onClick={closeModal}
                  >
                    <span className='sr-only'>Close</span>
                    {/* close icon */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-6 w-6'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18 18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <DialogTitle
                      as='h3'
                      className='text-lg leading-6 font-medium text-gray-900 mb-4'
                    >
                      Transaction Details
                    </DialogTitle>

                    <div className='mt-2'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <tbody className='bg-white divide-y divide-gray-200'>
                          <tr>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500'>
                              Transaction ID
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                              {transaction.details.transactionId}
                            </td>
                          </tr>
                          <tr>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500'>
                              Recipient
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                              {transaction.details.recipient}
                            </td>
                          </tr>
                          <tr>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500'>
                              Method
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                              {transaction.details.method}
                            </td>
                          </tr>
                          <tr>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500'>
                              Notes
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                              {transaction.details.notes}
                            </td>
                          </tr>
                          {/* Add more details as needed */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Close button (mobile) */}
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:text-sm'
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
    </Transition.Root>
  );
};

export default TransactionModal;
