import { Link } from 'react-router-dom';
import { NavLinks, NavDropdownLinks } from '../components';
import { navLinks } from '../data';
// icons
import { TfiMenu } from 'react-icons/tfi';
import { GiShoppingCart } from 'react-icons/gi';
import { PiUserCircle } from 'react-icons/pi';

const Navbar = () => {
  return (
    <nav id='navbar' className='bg-secondary sticky top-0 w-full z-10'>
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
          <ul className='menu menu-horizontal text-primary uppercase font-medium '>
            <NavLinks links={navLinks} />
          </ul>
        </div>
        {/* NAV END */}
        <div className='navbar-end'>
          <div className='indicator mr-3 lg:mr-5 btn btn-primary btn-circle btn-sm'>
            <span className='indicator-item badge badge-xs lg:badge-sm badge-accent font-medium'>
              41
            </span>
            <GiShoppingCart className='text-2xl' />
          </div>
          <Link
            to='/login'
            className='badge badge-primary badge-outline badge-lg'
          >
            <p className='uppercase font-medium'>login</p>
            <PiUserCircle className='text-2xl' />
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
