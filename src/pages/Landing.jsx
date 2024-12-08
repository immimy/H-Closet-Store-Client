import { Carousel, Hero, Title } from '../components';
import { customFetch } from '../utilities/customFetch';
import { useLoaderData } from 'react-router-dom';

const featuredProductsQuery = (category) => {
  return {
    queryKey: ['featuredProduct', category],
    queryFn: async () => {
      const { data } = await customFetch(
        `/products?category=${category}&featured=true`
      );
      return data;
    },
  };
};

export const loader = (queryClient) => {
  return async () => {
    const bagResp = await queryClient.ensureQueryData(
      featuredProductsQuery('bag')
    );
    const clothesResp = await queryClient.ensureQueryData(
      featuredProductsQuery('clothes')
    );
    const accessoryResp = await queryClient.ensureQueryData(
      featuredProductsQuery('accessory')
    );

    const featuredBags = bagResp.data.products;
    const featuredClothes = clothesResp.data.products;
    const featuredAccessories = accessoryResp.data.products;
    return { featuredBags, featuredClothes, featuredAccessories };
  };
};

const Landing = () => {
  const { featuredBags, featuredClothes, featuredAccessories } =
    useLoaderData();

  return (
    <div className='align-element mt-8 md:mt-12'>
      {/* HERO */}
      <section className='flex flex-col md:flex-row md:gap-x-8 lg:flex-row-reverse lg:gap-x-12'>
        <Hero />
      </section>
      {/* FEATURED PRODUCTS */}
      <section className='mt-16'>
        <div className='pt-8'>
          <Title text='best seller' />
        </div>
        <div className='pt-8'>
          <Title text='clothes' />
          <Carousel products={featuredClothes} />
        </div>
        <div className='pt-8'>
          <Title text='bags' />
          <Carousel products={featuredBags} />
        </div>
        <div className='pt-8'>
          <Title text='accessories' />
          <Carousel products={featuredAccessories} />
        </div>
      </section>
    </div>
  );
};
export default Landing;
