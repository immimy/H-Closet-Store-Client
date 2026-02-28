import { Link, useRouteError } from 'react-router-dom';
import notFoundImg from '../assets/errors.svg';
import errorsImg from '../assets/errors.svg';

const Errors = () => {
  const error = useRouteError();
  console.log(error);

  let errorInfo;
  if (error.status === 504) {
    errorInfo = {
      img: { src: errorsImg, alt: '504 gateway timeout' },
      heading: 'Server Timeout',
      paragraph:
        'This error occurred because the server was in a cold start state. Please refresh the page and try again.',
    };
  } else if (error.status === 404) {
    errorInfo = {
      img: { src: notFoundImg, alt: '404 not found' },
      heading: 'Page not found',
      paragraph: "Sorry, we couldn't find the page you are looking for...",
    };
  } else {
    errorInfo = {
      img: { src: errorsImg, alt: 'an errors occurred' },
      heading: 'There was an error...',
      paragraph: 'Sorry, we are currently fixing the issues...',
    };
  }

  return (
    <main className='grid min-h-screen place-items-center'>
      <div className='mx-6'>
        <div className='max-w-3xl'>
          <img src={errorInfo.img.src} alt={errorInfo.img.alt} />
        </div>
        <div className='mt-6 grid justify-items-center gap-y-4'>
          <h1 className='text-4xl font-bold text-[#F50035]'>
            {errorInfo.heading}
          </h1>
          <p className='text-primary-content'>{errorInfo.paragraph}</p>
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
};
export default Errors;
