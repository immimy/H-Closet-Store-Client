import { Outlet, useNavigation } from 'react-router-dom';
import { Footer, Loading, Navbar } from '../components';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <main className='min-h-screen flex flex-col'>
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <>
          <div className='flex-1'>
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </main>
  );
};
export default HomeLayout;
