import { Form } from 'react-router-dom';
import { FormInput, SubmitButton } from '../components';
import { customFetch } from '../utilities';
import { toast } from 'react-toastify';
import { RiLockPasswordFill } from 'react-icons/ri';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/forgot-password', data);
    toast.success('Please check your email.');
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg || 'Fails to send an email.';
    toast.error(errorMessage);
  }
  return null;
};

const ForgotPassword = () => {
  return (
    <main className='min-h-screen flex justify-center'>
      <Form
        method='post'
        className='mt-32 p-12 bg-neutral rounded-box text-center self-start w-full max-w-md'
      >
        <div className='p-8 bg-accent rounded-full inline-block'>
          <RiLockPasswordFill className='text-6xl text-accent-content' />
        </div>
        <div className='mt-4 grid gap-y-4'>
          <h1 className='text-center text-4xl font-semibold tracking-wider'>
            Forgot Password
          </h1>
          <FormInput
            type='email'
            name='email'
            placeholder='Enter email address'
          />
          <SubmitButton text='submit' />
        </div>
      </Form>
    </main>
  );
};
export default ForgotPassword;
