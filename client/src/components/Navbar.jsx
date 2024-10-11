import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoWhite, LogoDark } from '../assets/index';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-10 transition-colors duration-300 ${
        scrollPosition > 0 ? 'bg-white shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}

          <div className='flex-shrink-0 flex items-center gap-1'>
            <img
              src={scrollPosition > 0 ? LogoDark : LogoWhite}
              alt=''
              className='w-36  '
            />
            {/* <Link
              to='/'
              className={`text-2xl font-bold ${
                scrollPosition > 0 ? 'text-[#071847]' : 'text-white'
              }`}
            >
              PayZeph
            </Link> */}
          </div>
          {/* Menu */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              <Link
                to='/'
                className={`px-3 py-2 rounded-md text-sm font-medium hover:text-blue-400 transition duration-300 ${
                  scrollPosition > 0 ? 'text-[#071847]' : 'text-white'
                }`}
              >
                Home
              </Link>
              <a
                href='#about'
                onClick={() => scrollToSection('about')}
                className={`px-3 py-2 rounded-md text-sm font-medium hover:text-blue-400 transition duration-300 ${
                  scrollPosition > 0 ? 'text-[#071847]' : 'text-white'
                }`}
              >
                About
              </a>

              <a
                href='#contact'
                onClick={() => scrollToSection('contact')}
                className={`px-3 py-2 rounded-md text-sm font-medium hover:text-blue-400 transition duration-300 ${
                  scrollPosition > 0 ? 'text-[#071847]' : 'text-white'
                }`}
              >
                Contact
              </a>
              <Link
                to='/register'
                className=' py-2 px-6 bg-web3Bright-100 rounded-lg hover:bg-white hover:text-[#071847] hover:font-bold transition duration-300 aninmate-pulse'
              >
                Register
              </Link>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className='-mr-2 flex md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type='button'
              className='bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none transition duration-300'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {/* Icon when menu is closed */}
              {!isOpen ? (
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              ) : (
                // Icon when menu is open
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden' id='mobile-menu'>
          <div className='px-2 backdrop-blur-lg pt-2 pb-3 space-y-1 sm:px-3 animate-fade-in'>
            <Link
              to='/'
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition duration-300 ${
                scrollPosition > 0 ? 'text-[#071847]' : 'text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to='#about'
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition duration-300 ${
                scrollPosition > 0 ? 'text-[#071847]' : 'text-white'
              }`}
            >
              About
            </Link>

            <Link
              to='/contact'
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition duration-300 ${
                scrollPosition > 0 ? 'text-[#071847]' : 'text-white'
              }`}
            >
              Contact
            </Link>

            <Link
              to='/register'
              className=' py-2 px-6 bg-web3Bright-100 rounded-lg hover:bg-white hover:text-[#071847] hover:font-bold transition duration-300 aninmate-pulse'
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
