import { Form, Link, redirect } from 'react-router-dom';
import {
  PasswordInput,
  FormInput,
  SubmitButton,
  DemoUserLogin,
} from '../components';
import { customFetch } from '../utilities/customFetch';
import { toast } from 'react-toastify';
// state management
import { useDispatch } from 'react-redux';
import { setTheme } from '../features/theme/themeSlice';
import { loginUser } from '../features/user/userSlice';

export const action = (store) => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post('/auth/login', data);

      const response = await customFetch.get('/users/showMe');
      store.dispatch(loginUser(response.data.user));
      toast.success('Logged in successfully!');
      return redirect('/');
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Log in Failed.';
      toast.error(errorMessage);
      return null;
    }
  };
};

const Login = () => {
  const dispatch = useDispatch();
  dispatch(setTheme());

  return (
    <main className='min-h-screen grid place-items-center'>
      <div className='p-12 md:p-20 md:px-16 md:py-20 bg-neutral shadow-2xl w-full max-w-md md:max-w-lg transition-all'>
        {/* LOGIN FORM */}
        <Form method='post' className='flex flex-col gap-y-8'>
          <h1 className='text-center uppercase font-bold text-4xl text-neutral-content'>
            login
          </h1>
          <div className='flex flex-col gap-y-4'>
            <FormInput title='username / email' name='identifier' type='text' />
            <PasswordInput title='password' name='password' />
            <Link
              to='/user/forgot-password'
              className='link capitalize text-secondary font-medium flex justify-end'
            >
              forgot password?
            </Link>
          </div>
          <SubmitButton text='sign in' />
        </Form>
        {/* DEMO USER */}
        <DemoUserLogin />
        <hr className='mt-4' />
        {/* REGISTER */}
        <p className='my-2 text-center font-semibold uppercase'>or</p>
        <Link to='/register' className='btn btn-block btn-secondary uppercase'>
          register
        </Link>
      </div>
    </main>
  );
};
export default Login;
