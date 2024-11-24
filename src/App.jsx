import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// pages
import {
  HomeLayout,
  Landing,
  Products,
  Clothes,
  Bags,
  Accessories,
  SingleClothes,
  SingleBag,
  SingleAccessory,
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
      staleTime: 1000 * 60 * 5, // 5 mins
    },
  },
});

// loaders
import { loader as landingLoader } from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Errors />,
    children: [
      { index: true, element: <Landing />, loader: landingLoader },
      { path: '/products', element: <Products /> },
      { path: '/products/clothes', element: <Clothes /> },
      { path: '/products/clothes/:id', element: <SingleClothes /> },
      { path: '/products/bags', element: <Bags /> },
      { path: '/products/bags/:id', element: <SingleBag /> },
      { path: '/products/accessories', element: <Accessories /> },
      { path: '/products/accessories/:id', element: <SingleAccessory /> },
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
