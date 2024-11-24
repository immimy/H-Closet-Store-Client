import { Carousel, Hero, Title } from '../components';
import { customFetch } from '../utilities/customFetch';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  // BEST SELLER
  const resp_bag = await customFetch('/featured?category=bag');
  const resp_clothes = await customFetch('/featured?category=clothes');
  const resp_accessory = await customFetch('/featured?category=accessory');

  const featuredProducts = {
    // BEST SELLER
    bags: resp_bag.data.products,
    clothes: resp_clothes.data.products,
    accessories: resp_accessory.data.products,
  };

  return featuredProducts;
};

const Landing = () => {
  const { bags, clothes, accessories } = useLoaderData();
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
          <Carousel products={clothes} />
        </div>
        <div className='pt-8'>
          <Title text='bags' />
          <Carousel products={bags} />
        </div>
        <div className='pt-8'>
          <Title text='accessories' />
          <Carousel products={accessories} />
        </div>
      </section>
    </div>
  );
};
export default Landing;
