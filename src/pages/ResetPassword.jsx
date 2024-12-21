import { Form, redirect, useLoaderData } from 'react-router-dom';
import { PasswordInput, SubmitButton } from '../components';
import { customFetch } from '../utilities';
import { toast } from 'react-toastify';
import { RiLockPasswordFill } from 'react-icons/ri';
// state management
import { useDispatch } from 'react-redux';
import { setTheme } from '../features/theme/themeSlice';

export const loader = async ({ request }) => {
  const searchParams = Object.fromEntries(
    new URL(request.url).searchParams.entries()
  );
  return searchParams;
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { newPassword, confirmedPassword, email, token } =
    Object.fromEntries(formData);

  // input validation
  if (!newPassword || !confirmedPassword) {
    toast.error('Please provide passwords.');
    return null;
  }
  if (!(newPassword.length >= 6) || !(confirmedPassword.length >= 6)) {
    toast.error('Password must be not less than 6 characters.');
    return null;
  }
  if (newPassword !== confirmedPassword) {
    toast.error('Your passwords did not match. Try again.');
    return null;
  }

  const data = { email, password: confirmedPassword, token };
  await customFetch.patch('/auth/reset-password', data);
  toast.success('Success! Already reset password.');

  return redirect('/login');
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  dispatch(setTheme());
  const { email, token } = useLoaderData();

  return (
    <main className='min-h-screen flex justify-center'>
      <Form
        method='post'
        className='mt-32 p-12 bg-neutral rounded-box text-center self-start w-full max-w-md'
      >
        <div className='p-8 bg-accent rounded-full inline-block relative'>
          <RiLockPasswordFill className='text-6xl text-accent-content' />
          <span className='absolute uppercase top-0 right-0 bg-warning -skew-x-12 p-1 font-medium'>
            new
          </span>
        </div>
        <div className='mt-4 grid gap-y-4'>
          <h1
            className='text-center text-4xl font-semibold 
          tracking-wider'
          >
            Reset Password
          </h1>
          <PasswordInput name='newPassword' placeholder='Enter new password' />
          <PasswordInput
            name='confirmedPassword'
            placeholder='Confirm new password'
          />
          <input type='text' hidden name='email' defaultValue={email} />
          <input type='text' hidden name='token' defaultValue={token} />
          <SubmitButton text='reset' />
        </div>
      </Form>
    </main>
  );
};
export default ResetPassword;
