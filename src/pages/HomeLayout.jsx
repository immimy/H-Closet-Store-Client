import { Outlet, useNavigation } from 'react-router-dom';
import { Footer, Loading, Navbar } from '../components';
import { useDispatch } from 'react-redux';
import { setTheme } from '../features/theme/themeSlice';

const HomeLayout = () => {
  const dispatch = useDispatch();
  dispatch(setTheme());

  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <main>
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <>
          <Outlet />
          <Footer />
        </>
      )}
    </main>
  );
};
export default HomeLayout;
