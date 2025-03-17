import { useSelector } from 'react-redux';
import { Alert, Carousel, Hero, Title } from '../components';
import { customFetch } from '../utilities';
import { useLoaderData } from 'react-router-dom';

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
    const { products } = await queryClient.ensureQueryData(
      bestsellerProductsQuery({ limit: 12 })
    );
    return { products };
  };
};

const Landing = () => {
  const { user } = useSelector((store) => store.user);
  const isShowAlert = user && user.username !== 'demo' && user.role === 'user';

  const { products } = useLoaderData();

  return (
    <div className='align-element mt-8'>
      {/* ALERT */}
      {isShowAlert && (
        <Alert text='Due to demo purpose, new registered accounts will last only 1 day.' />
      )}
      {/* HERO */}
      <section className='mt-8 flex flex-col md:flex-row md:gap-x-8 lg:flex-row-reverse lg:gap-x-12'>
        <Hero />
      </section>
      {/* BESTSELLER PRODUCTS */}
      <section className='mt-16'>
        <div className='pt-8'>
          <Title text='best seller' />
          <Carousel products={products} />
        </div>
      </section>
    </div>
  );
};
export default Landing;
