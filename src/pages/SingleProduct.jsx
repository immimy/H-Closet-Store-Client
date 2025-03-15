import { useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import {
  ProductSizeSelect,
  ProductColorInput,
  ProductAmountSelect,
  SubmitButton,
  ReviewContainer,
} from '../components';
import {
  customFetch,
  getNumberInStockOfSelectedOption,
  formattedPrice,
  generateAmountOptions,
  getAvailableProducts,
} from '../utilities';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
// State management
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

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
  const dispatch = useDispatch();

  // Toggle length of description
  const [isMoreDesc, setIsMoreDesc] = useState(false);

  const { product } = useLoaderData();
  const {
    _id: id,
    name,
    category,
    type,
    brand,
    image,
    description,
    size,
    color,
    price,
    inventory,
    isOnSale,
    discount,
    sellingPrice,
  } = product;

  // Product option
  // - Clothes: size
  // - Bags: color
  // - Accessory: none
  const option = size || color;

  // Get only available products
  // So client cannot add item that is out of stock to cart.
  const { availableOption, availableInventory } = getAvailableProducts({
    option,
    inventory,
  });

  // Is this single product out of stock?
  const isOutOfStock = availableInventory.length === 0;

  // Limit amount selection not to exceed a number in stock.
  const [selectedOption, setSelectedOption] = useState(availableOption?.[0]);
  const numberInStock = getNumberInStockOfSelectedOption({
    selectedOption,
    optionArr: option,
    inventoryArr: inventory,
  });

  const handleAddToCart = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { size, color } = data;
    const cartID = `${id}_${
      size?.toLowerCase() || color?.toLowerCase() || 'accessory'
    }`;
    const amount = Number(data.amount);

    // Set up data adding to cart
    const cartItem = {
      cartID,
      productID: id,
      name,
      category,
      image,
      price: price,
      sellingPrice: sellingPrice,
      isOnSale,
      discount: isOnSale ? discount : 0,
      numberInStock,
      ...data,
      amount,
    };
    const cartItemData = {
      cartID,
      option: availableOption,
      inventory: availableInventory,
    };

    dispatch(addItem({ cartItem, cartItemData }));
  };

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
          <div className='text-secondary-content tracking-widest flex flex-col gap-2'>
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
          {isOutOfStock ? (
            <h6 className='mt-8 text-center font-semibold text-3xl tracking-widest capitalize italic text-accent'>
              out of stock
            </h6>
          ) : (
            <>
              <div className='text-secondary-content font-medium text-lg mt-4'>
                <div className='flex flex-wrap items-center gap-2'>
                  <p className='uppercase'>
                    Price :
                    <span className='ml-4 tracking-wider'>
                      {formattedPrice(sellingPrice)}
                    </span>
                  </p>
                  {isOnSale && (
                    <>
                      <span className='badge badge-warning'>-{discount}%</span>
                      <span className='font-normal line-through text-base'>
                        {formattedPrice(price)}
                      </span>
                    </>
                  )}
                </div>
                <Form
                  className='flex flex-col gap-8 p-2 sm:p-4 md:p-6'
                  onSubmit={handleAddToCart}
                >
                  <div className='mt-2'>
                    {/* Clothes - size selection */}
                    {category === 'clothes' && (
                      <ProductSizeSelect
                        title='size'
                        name='size'
                        options={availableOption}
                        value={selectedOption}
                        setValue={setSelectedOption}
                      />
                    )}
                    {/* Bag - color selection */}
                    {category === 'bag' && (
                      <ProductColorInput
                        title='color'
                        name='color'
                        options={availableOption}
                        value={selectedOption}
                        setValue={setSelectedOption}
                      />
                    )}
                    {/* Amount Selection */}
                    <ProductAmountSelect
                      title='amount'
                      name='amount'
                      options={
                        numberInStock > 10
                          ? generateAmountOptions(10)
                          : generateAmountOptions(numberInStock)
                      }
                      numberInStock={numberInStock}
                    />
                  </div>
                  <SubmitButton text='add to cart' />
                </Form>
              </div>
            </>
          )}
        </div>
      </div>
      <div className='mt-6'>
        <ReviewContainer />
      </div>
    </div>
  );
};
export default SingleProduct;
