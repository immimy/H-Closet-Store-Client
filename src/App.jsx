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
// actions
import { action as loginAction } from './pages/Login';
import { action as registerAction } from './pages/Register';

// redux
import { store } from './store';

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
    ],
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
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
