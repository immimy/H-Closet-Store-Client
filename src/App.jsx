import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// pages
import {
  HomeLayout,
  Landing,
  Products,
  SingleProduct,
  Promotion,
  Login,
  Register,
  Errors,
  EmailVerification,
  ForgotPassword,
  ResetPassword,
  Cart,
  Checkout,
  Orders,
  Complete,
  SingleOrder,
} from './pages';

// query client
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 mins
    },
  },
});

// loaders
import { loader as landingLoader } from './pages/Landing';
import { loader as productsLoader } from './pages/Products';
import { loader as singleProductsLoader } from './pages/SingleProduct';
import { loader as emailVerificationLoader } from './pages/EmailVerification';
import { loader as resetPasswordLoader } from './pages/ResetPassword';
import { loader as checkoutLoader } from './pages/Checkout';
import { loader as completeLoader } from './pages/Complete';
import { loader as cartLoader } from './pages/Cart';
import { loader as ordersLoader } from './pages/Orders';
import { loader as singleOrderLoader } from './pages/SingleOrder';
// actions
import { action as loginAction } from './pages/Login';
import { action as registerAction } from './pages/Register';
import { action as forgotPasswordAction } from './pages/ForgotPassword';
import { action as resetPasswordAction } from './pages/ResetPassword';
import { action as cartAction } from './pages/Cart';

// redux
import { store } from './store';

// stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
  'pk_test_51OvGfIP7SK6yH568WZiu6JrtBIopOwGr2YsEdkYOvt5SBU8I8trqXxlZXuhPcjDcIu4HRrqKva7n1qGbh2JGiTft005FhDO75Y'
);
const options = {
  mode: 'setup',
  currency: 'thb',
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Errors />,
    children: [
      { index: true, element: <Landing />, loader: landingLoader(queryClient) },
      {
        path: '/products',
        element: <Products />,
        loader: productsLoader(queryClient),
      },
      {
        path: '/products/:id',
        element: <SingleProduct />,
        loader: singleProductsLoader(queryClient),
      },
      { path: '/promotion', element: <Promotion /> },
      {
        path: '/cart',
        element: <Cart />,
        loader: cartLoader(store),
        action: cartAction(store),
      },
      {
        path: '/checkout',
        element: <Checkout store={store} stripePromise={stripePromise} />,
        loader: checkoutLoader(store),
      },

      {
        path: '/orders',
        element: <Orders />,
        loader: ordersLoader({ store, queryClient }),
      },
      {
        path: '/orders/:id',
        element: <SingleOrder />,
        loader: singleOrderLoader({ store, queryClient }),
      },
    ],
  },
  {
    path: '/complete',
    element: <Complete />,
    errorElement: <Errors />,
    loader: completeLoader({ stripePromise, store }),
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Errors />,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Errors />,
    action: registerAction,
  },
  {
    path: '/user/verify-account',
    element: <EmailVerification />,
    errorElement: <Errors />,
    loader: emailVerificationLoader,
  },
  {
    path: '/user/forgot-password',
    element: <ForgotPassword />,
    errorElement: <Errors />,
    action: forgotPasswordAction,
  },
  {
    path: '/user/reset-password',
    element: <ResetPassword />,
    errorElement: <Errors />,
    loader: resetPasswordLoader,
    action: resetPasswordAction,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise} options={options}>
        <RouterProvider router={router} />
      </Elements>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
