import { Form, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import {
  ProductSelect,
  ProductColorSelect,
  SubmitButton,
  ReviewContainer,
} from '../components';
import {
  customFetch,
  formattedPrice,
  generateAmountOptions,
} from '../utilities';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

const singleProductQuery = (productID) => {
  return {
    queryKey: ['product', productID],
    queryFn: async () => {
      const { data } = await customFetch(`products/${productID}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    const resp = await queryClient.ensureQueryData(singleProductQuery(id));
    return resp.data;
  };

const SingleProduct = () => {
  const { product } = useLoaderData();
  const {
    image,
    name,
    category,
    brand,
    type,
    description,
    price,
    size,
    color,
  } = product;

  const [isMoreDesc, setIsMoreDesc] = useState(false);

  return (
    <div className='align-element mt-8 md:mt-12 px-8 md:px-16'>
      <div className='grid md:grid-cols-2 justify-items-center gap-12'>
        <figure className='max-w-2xl'>
          <img
            src={image}
            alt={name}
            className='object-cover max-h-[460px] md:max-h-[640px] rounded-badge shadow-2xl'
          />
        </figure>
        <div className='flex flex-col gap-6 md:gap-12 p-8'>
          <div className='text-secondary tracking-widest flex flex-col gap-2'>
            <h1 className='text-4xl lg:text-5xl capitalize font-bold'>
              {name}
            </h1>
            <h3 className='text-2xl lg:text-3xl capitalize text-error font-semibold'>
              {brand}
            </h3>
            <h6 className='text-xl lg:text-2xl capitalize font-medium'>
              {category} : <span className='ml-3 md:ml-6'>{type}</span>
            </h6>
          </div>
          <p className='text-primary-content leading-loose tracking-wide'>
            {isMoreDesc ? (
              <>
                {description}
                <button
                  className='ml-2 btn btn-circle btn-xs btn-secondary'
                  onClick={() => setIsMoreDesc(!isMoreDesc)}
                >
                  <FaAngleUp />
                </button>
              </>
            ) : (
              <>
                {description.slice(0, 350)}...
                <button
                  className='ml-2 btn btn-circle btn-xs btn-secondary'
                  onClick={() => setIsMoreDesc(!isMoreDesc)}
                >
                  <FaAngleDown />
                </button>
              </>
            )}
          </p>
          <div className='text-secondary font-medium text-lg mt-4'>
            <p className='uppercase'>
              Price : <span className='ml-4'>$ {formattedPrice(price)}</span>
            </p>
            <Form className='flex flex-col gap-8 p-2 sm:p-4 md:p-6'>
              <div className='mt-2'>
                {/* Clothes - size selection */}
                {category === 'clothes' && (
                  <ProductSelect title='size' name='size' options={size} />
                )}
                {/* Bag - color selection */}
                {category === 'bag' && (
                  <ProductColorSelect
                    title='color'
                    name='color'
                    options={color}
                  />
                )}
                <ProductSelect
                  title='amount'
                  name='amount'
                  options={generateAmountOptions(10)}
                />
              </div>
              <SubmitButton text='add to cart' />
            </Form>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <ReviewContainer />
      </div>
    </div>
  );
};
export default SingleProduct;
