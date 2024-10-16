/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/Dashboard/Dashboard.js

import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashNav from '../../components/DashNav';

const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 md:ml-64   bg-gray-100 min-h-screen'>
        <DashNav />
        <div className=' pt-24  p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
