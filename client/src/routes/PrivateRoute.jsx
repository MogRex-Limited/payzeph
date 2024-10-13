import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);

  return auth?.success ? <Dashboard /> : <Navigate to='/login' />;
};

export default PrivateRoute;
