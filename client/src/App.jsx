import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Home from './pages/Landing/auth/Home';
import About from './pages/Landing/About';
import Footer from './components/Footer';
import Register from './pages/Landing/auth/Register';
import Login from './pages/Landing/Login';
import DashboardHome from './pages/Dashboard/components/DashboardHome';
// import Settings from './pages/Dashboard/Settings';
import EditPersonal from './pages/Dashboard/components/EditPersonal';
import EditPassword from './pages/Dashboard/components/EditPassword';
import ProfileInner from './pages/Dashboard/components/ProfileInner';
import WalletInner from './pages/Dashboard/components/WalletInner';
import NotFound from './routes/NotFound';
import OTPVerificationPage from './pages/Landing/auth/Otp';
import TwoFA from './pages/Landing/auth/TwoFactor';

function App() {
  return (
    <div className='bmg-gradient-to-br fromm-web3Dark-100 vmia-web3Dark-200 mto-web3Dark-300 bg-gradient-web3 text-white min-h-screen flex flex-col'>
      <Routes>
        <Route path='dashboard' element={<PrivateRoutes />}>
          {/* <Route element={<Dashboard />} /> */}
          <Route path='' element={<DashboardHome />} />
          <Route path='profile' element={<ProfileInner />} />
          <Route path='wallets' element={<WalletInner />} />

          {/* <Route path='settings' element={<Settings />}> */}
          <Route path='settings' element={<EditPersonal />} />
          <Route path='password' element={<EditPassword />} />
          {/* </Route> */}
        </Route>

        <Route path='/' element={<PublicRoute />}>
          <Route path='' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/otp' element={<OTPVerificationPage />} />
          <Route path='/two-factor' element={<TwoFA />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
