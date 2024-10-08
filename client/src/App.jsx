import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Home from './pages/Landing/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import About from './pages/Landing/About';
import Footer from './components/Footer';
import Register from './pages/Landing/Register';
import Login from './pages/Landing/Login';

function App() {
  return (
    <div className='bmg-gradient-to-br fromm-web3Dark-100 vmia-web3Dark-200 mto-web3Dark-300 bg-gradient-web3 text-white min-h-screen flex flex-col'>
      <Routes>
        <Route path='dashboard' element={<PrivateRoutes />}>
          <Route path='' element={<Dashboard />} />
        </Route>

        <Route path='/' element={<PublicRoute />}>
          <Route path='' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
