// src/components/TransactionTable.js

import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import TransactionModal from './TransactionModal';

const transactionsData = [
  {
    id: 1,
    date: '2024-04-01',
    amount: 500,
    status: 'Credit',
    source: 'Crypto',
    details: {
      transactionId: 'TXN123456',
      recipient: '0xABCDEF123456',
      method: 'Crypto Wallet',
      notes: 'Payment for invoice #INV1001',
    },
  },
  {
    id: 2,
    date: '2024-04-02',
    amount: 200,
    status: 'Debit',
    source: 'Fiat',
    details: {
      transactionId: 'TXN123457',
      recipient: 'John Doe',
      method: 'Bank Transfer',
      notes: 'Withdrawal to bank account',
    },
  },
  {
    id: 3,
    date: '2024-04-03',
    amount: 150,
    status: 'Pending',
    source: 'Others',
    details: {
      transactionId: 'TXN123458',
      recipient: 'Jane Smith',
      method: 'Mobile Payment',
      notes: 'Payment pending approval',
    },
  },
  {
    id: 4,
    date: '2024-04-04',
    amount: 300,
    status: 'Reversed',
    source: 'Crypto',
    details: {
      transactionId: 'TXN123459',
      recipient: '0x123456ABCDEF',
      method: 'Crypto Wallet',
      notes: 'Reversed due to insufficient funds',
    },
  },
  {
    id: 5,
    date: '2024-04-01',
    amount: 500,
    status: 'Credit',
    source: 'Crypto',
    details: {
      transactionId: 'TXN123456',
      recipient: '0xABCDEF123456',
      method: 'Crypto Wallet',
      notes: 'Payment for invoice #INV1001',
    },
  },
  {
    id: 6,
    date: '2024-04-02',
    amount: 200,
    status: 'Debit',
    source: 'Fiat',
    details: {
      transactionId: 'TXN123457',
      recipient: 'John Doe',
      method: 'Bank Transfer',
      notes: 'Withdrawal to bank account',
    },
  },
  {
    id: 7,
    date: '2024-04-03',
    amount: 150,
    status: 'Pending',
    source: 'Others',
    details: {
      transactionId: 'TXN123458',
      recipient: 'Jane Smith',
      method: 'Mobile Payment',
      notes: 'Payment pending approval',
    },
  },
  {
    id: 8,
    date: '2024-04-04',
    amount: 300,
    status: 'Reversed',
    source: 'Crypto',
    details: {
      transactionId: 'TXN123459',
      recipient: '0x123456ABCDEF',
      method: 'Crypto Wallet',
      notes: 'Reversed due to insufficient funds',
    },
  },
  {
    id: 9,
    date: '2024-04-04',
    amount: 300,
    status: 'Reversed',
    source: 'Crypto',
    details: {
      transactionId: 'TXN123459',
      recipient: '0x123456ABCDEF',
      method: 'Crypto Wallet',
      notes: 'Reversed due to insufficient funds',
    },
  },
  // Add more transactions as needed
];

const statusColors = {
  Credit: 'text-green-500 bg-green-100',
  Debit: 'text-red-500 bg-red-100',
  Pending: 'text-yellow-500 bg-yellow-100',
  Reversed: 'text-orange-500 bg-orange-100',
};

const TransactionTable = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  return (
    <div className='bg-white rounded-lg shadow p-6 pb-2 pt-3'>
      <h2 className='text-2xl font-semibold mb-3 text-gray-700'>
        Transaction History
      </h2>
      <div className='overflow-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Date
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Amount
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Source
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {transactionsData.map((transaction) => (
              <tr key={transaction.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {transaction.date}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  ${transaction.amount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusColors[transaction.status]
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {transaction.source}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <Menu as='div' className='relative inline-block text-left'>
                    <MenuButton className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'>
                      Actions
                      {/* chevron down icon */}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='-mr-1 ml-2 h-5 w-5'
                        aria-hidden='true'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='m19.5 8.25-7.5 7.5-7.5-7.5'
                        />
                      </svg>
                    </MenuButton>

                    <MenuItems className='origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
                      <div className='py-1'>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => openModal(transaction)}
                              className={`${
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700'
                              } block w-full text-left px-4 py-2 text-sm`}
                            >
                              View More
                            </button>
                          )}
                        </MenuItem>
                        {/* Add more actions here if needed */}
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Transaction Details */}
      {isModalOpen && selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          isOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default TransactionTable;
