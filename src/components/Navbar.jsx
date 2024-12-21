import { Link } from 'react-router-dom';
import { NavLinks, NavDropdownLinks } from '../components';
import { navLinks } from '../data';

// icons
import { TfiMenu } from 'react-icons/tfi';
import { GiShoppingCart } from 'react-icons/gi';
import { PiUserCircle } from 'react-icons/pi';
import { FiSun, FiMoon } from 'react-icons/fi';
// state management
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';
import { logoutUser } from '../features/user/userSlice';
import { customFetch } from '../utilities/customFetch';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const handleLogout = async () => {
    await customFetch.delete('/auth/logout');
    dispatch(logoutUser());
    toast.error('Logged out.');
  };

  return (
    <nav id='navbar' className='bg-secondary sticky top-0 w-full z-10'>
      {user && (
        <div className='bg-neutral '>
          <div className='align-element flex justify-end items-center gap-x-4 md:gap-x-8'>
            <p className='text-right capitalize text-lg tracking-wider'>
              welcome, {user.username}!
            </p>
            <button
              className='btn btn-xs btn-link uppercase font-bold'
              onClick={handleLogout}
            >
              log out
            </button>
          </div>
        </div>
      )}
      <div className='navbar align-element md:px-12 lg:px-16 transition-all'>
        {/* NAV START */}
        <div className='navbar-start'>
          {/* DROPDOWN MENU */}
          <div className='dropdown dropdown-hover lg:hidden'>
            <div tabIndex={0} className='btn btn-secondary btn-circle'>
              <TfiMenu className='text-lg' />
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu menu-sm bg-base-100 shadow rounded-box p-6 capitalize font-medium'
            >
              <NavDropdownLinks links={navLinks} />
            </ul>
          </div>
          {/* H. CLOSET */}
          <Link
            to='/'
            className='text-xl font-bold text-secondary-content font-serif'
          >
            H. Closet
          </Link>
        </div>
        {/* NAV CENTER */}
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal text-secondary-content uppercase font-medium '>
            <NavLinks links={navLinks} />
          </ul>
        </div>
        {/* NAV END */}
        <div className='navbar-end'>
          <button
            type='button'
            className='mr-3 lg:mr-5'
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'sunTheme' ? (
              <FiSun className='text-xl lg:text-2xl text-secondary-content' />
            ) : (
              <FiMoon className='text-xl lg:text-2xl text-secondary-content' />
            )}
          </button>

          <div className='indicator mr-3 lg:mr-5 btn btn-primary btn-circle btn-sm'>
            <span className='indicator-item badge badge-xs lg:badge-sm badge-accent font-medium'>
              41
            </span>
            <GiShoppingCart className='text-2xl' />
          </div>
          {!user && (
            <Link to='/login' className='badge badge-neutral badge-lg'>
              <p className='uppercase font-medium'>login</p>
              <PiUserCircle className='text-2xl' />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
