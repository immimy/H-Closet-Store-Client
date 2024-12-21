import { useLoaderData, Link } from 'react-router-dom';
import { customFetch } from '../utilities';
// icons
import { SiVerizon } from 'react-icons/si';
import { ImCross } from 'react-icons/im';

export const loader = async ({ request }) => {
  const data = Object.fromEntries(new URL(request.url).searchParams.entries());

  let isVerificationSuccess;
  try {
    await customFetch.post('/auth/verify-email', data);
    isVerificationSuccess = true;
  } catch (error) {
    isVerificationSuccess = false;
  }

  return isVerificationSuccess;
};

const EmailVerification = () => {
  const isVerificationSuccess = useLoaderData();

  return (
    <main className='min-h-screen flex justify-center'>
      {isVerificationSuccess ? (
        <div className='mt-32 text-center'>
          <div className='rounded-full bg-success p-8 inline-block'>
            <SiVerizon className='text-8xl' />
          </div>
          <div className='mt-8'>
            <h1 className='text-6xl font-bold tracking-widest'>
              Email Verification
            </h1>
            <div className='mt-4 text-xl leading-loose'>
              <p>Your email was verified.</p>
              <p>You are already set to explore the site.</p>
              <Link to='/' className='link link-success font-medium'>
                Go to Home Page
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-32 text-center'>
          <div className='rounded-full bg-error p-8 inline-block'>
            <ImCross className='text-8xl' />
          </div>
          <div className='mt-8 leading-loose'>
            <h1 className='text-6xl font-bold tracking-widest'>
              Verification Failed
            </h1>
            <div className='mt-4 text-xl leading-loose'>
              <p>Sorry, your email verification timed out.</p>
              <p>Please register again.</p>
              <Link to='/register' className='link link-error font-medium'>
                Go to Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
export default EmailVerification;
