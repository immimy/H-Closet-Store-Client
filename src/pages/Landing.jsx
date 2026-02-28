import { useSelector } from 'react-redux';
import { Alert, Carousel, Hero, Title } from '../components';
import { customFetch } from '../utilities';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

const bestsellerProductsQuery = ({ limit }) => {
  return {
    queryKey: ['bestsellerProducts'],
    queryFn: async () => {
      const { data } = await customFetch(`/products/bestseller?limit=${limit}`);
      return data;
    },
  };
};

export const loader = (queryClient) => {
  return async () => {
    const productsPromise = queryClient.ensureQueryData(
      bestsellerProductsQuery({ limit: 12 }),
    );
    return defer({ products: productsPromise });
  };
};

const Landing = () => {
  const { user } = useSelector((store) => store.user);
  const isShowAlert = user && user.username !== 'demo' && user.role === 'user';

  const data = useLoaderData();

  return (
    <div className='align-element mt-8'>
      {/* ALERT */}
      {/* BUGFIX: Avoid showing blank page from slow loader due to server's cold start state */}
      <Suspense>
        {isShowAlert && (
          <Alert text='Due to demo purpose, new registered accounts will last only 1 day.' />
        )}
      </Suspense>
      {/* HERO */}
      <section className='mt-8 flex flex-col md:flex-row md:gap-x-8 lg:flex-row-reverse lg:gap-x-12'>
        <Hero />
      </section>
      {/* BESTSELLER PRODUCTS */}
      <section className='mt-16'>
        <div className='pt-8'>
          <Title text='best seller' />
          {/* BUGFIX: Avoid showing blank page from slow loader due to server's cold start state */}
          <Suspense fallback={<ProductsLoading />}>
            <Await resolve={data.products} errorElement={<ProductsError />}>
              {(resp) => <Carousel products={resp.products} />}
            </Await>
          </Suspense>
        </div>
      </section>
    </div>
  );
};
export default Landing;

function ProductsLoading() {
  return (
    <div className='py-16 text-center'>
      <span className='loading loading-spinner loading-xl text-primary-content' />
    </div>
  );
}

function ProductsError() {
  return (
    <div className='py-8 text-center'>
      <span className='text-primary-content tracking-widest italic'>
        Loading product error!
      </span>
    </div>
  );
}
