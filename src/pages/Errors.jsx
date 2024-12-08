import { Link, useRouteError } from 'react-router-dom';
import notFoundImg from '../assets/errors.svg';
import errorsImg from '../assets/errors.svg';
import { useDispatch } from 'react-redux';
import { setTheme } from '../features/theme/themeSlice';

const Errors = () => {
  useDispatch()(setTheme());
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <main className='grid min-h-screen place-items-center'>
        <div className='mx-6'>
          <div className='max-w-3xl'>
            <img src={notFoundImg} alt='404 not found' />
          </div>
          <div className='mt-6 grid justify-items-center gap-y-4'>
            <h1 className='text-4xl font-bold text-[#F50035]'>
              Page not found
            </h1>
            <p className='text-primary-content'>
              Sorry, we couldn't find the page you are looking for...
            </p>
            <Link
              to='/'
              className='btn bg-[#F50035] text-[#FFF] hover:text-[#333] uppercase'
            >
              go back home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='grid min-h-screen place-items-center'>
      <div className='mx-6'>
        <div className='max-w-3xl'>
          <img src={errorsImg} alt='404 not found' />
        </div>
        <div className='mt-6 grid justify-items-center gap-y-4'>
          <h1 className='text-4xl font-bold text-[#F50035]'>
            There was an error...
          </h1>
          <p className='text-primary-content'>
            Sorry, we are currently fixing the issues...
          </p>
        </div>
      </div>
    </main>
  );
};
export default Errors;
