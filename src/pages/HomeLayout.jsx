import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';

const HomeLayout = () => {
  document.documentElement.setAttribute('data-theme', 'moontheme');
  return (
    <main className='bg-primary h-full'>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};
export default HomeLayout;
