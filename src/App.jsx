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
import { loader as ProductsLoader } from './pages/Products';

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
        loader: ProductsLoader(queryClient),
      },
      { path: '/products/:id', element: <SingleProduct /> },
      { path: '/promotion', element: <Promotion /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Errors />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Errors />,
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
