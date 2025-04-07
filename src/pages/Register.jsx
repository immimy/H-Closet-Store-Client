import { Form, Link, redirect } from 'react-router-dom';
import { PasswordInput, FormInput, SubmitButton } from '../components';
import { customFetch } from '../utilities';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Please check your email to verify account.');
    return redirect('/login');
  } catch (error) {
    const errorMessage = error?.response?.data?.msg || 'Failed to register.';
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <main className='min-h-screen grid place-items-center'>
      <div className='p-12 md:p-20 md:px-16 md:py-20 bg-neutral shadow-2xl w-full max-w-md md:max-w-lg transition-all'>
        <Form method='post' className='flex flex-col gap-y-8'>
          <h1 className='text-center uppercase font-bold text-4xl text-neutral-content'>
            register
          </h1>
          <div className='flex flex-col gap-y-4'>
            <FormInput title='username' name='username' type='text' />
            <FormInput title='email' name='email' type='email' />
            <PasswordInput title='password' name='password' />
          </div>
          <SubmitButton text='sign up' />
        </Form>
        <Link to='/login' className='mt-4 link flex justify-center'>
          Already have an account?
        </Link>
      </div>
    </main>
  );
};
export default Register;
