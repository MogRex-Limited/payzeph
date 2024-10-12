/* eslint-disable react-hooks/exhaustive-deps */
// import { useLocation, Navigate } from 'react-router-dom';

// import Dashboard from '../pages/Dashboard/Dashboard';
// import AuthContext from '../context/AuthProvider';
// import { useContext, useEffect } from 'react';

// function PrivateRoutes() {
//   const { auth, setAuth } = useContext(AuthContext);
//   const { location } = useLocation();

// //   useEffect(() => {
// //     setAuth({ success: true,   name: 'John Doe',
//   email: 'john.doe@example.com',
//   avatar: 'https://example.com/avatar.jpg',});
// //   }, []);

//   return auth?.success ? (
//     <>
//       <Dashboard />
//     </>
//   ) : (
//     <Navigate to='/login' state={{ from: location }} replace />
//   );
// }

// export default PrivateRoutes;
// src/routes/PrivateRoute.js

import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';

const PrivateRoute = () => {
  const { auth, setAuth } = useContext(AuthContext);
  // const isAuthenticated = true;
  useEffect(() => {
    setAuth({
      success: true,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar.jpg',
      avatar2: 'https://i.pravatar.cc/150?img=2 ',
    });
  }, []);
  // const isAuthenticated = Boolean(localStorage.getItem('authToken')); // Replace with your auth logic

  return auth?.success ? <Dashboard /> : <Navigate to='/login' />;
};

export default PrivateRoute;
