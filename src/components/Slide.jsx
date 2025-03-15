import { MdAddShoppingCart } from 'react-icons/md';
import { formattedPrice } from '../utilities/formatting';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { getAvailableProducts } from '../utilities';

const Slide = ({ product }) => {
  const dispatch = useDispatch();

  const {
    _id: id,
    image,
    name,
    brand,
    price,
    category,
    size,
    color,
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

  // Set up data adding to cart
  let cartItem = {
    productID: id,
    name,
    category,
    image,
    price: price,
    sellingPrice: sellingPrice,
    isOnSale,
    discount: isOnSale ? discount : 0,
  };
  let cartItemData = {
    option: availableOption,
    inventory: availableInventory,
  };
  if (!isOutOfStock) {
    if (option) {
      const optionField = size ? 'size' : 'color';
      cartItem = { ...cartItem, [optionField]: availableOption[0] };
    }
    const cartID = `${id}_${availableOption?.[0].toLowerCase() || 'accessory'}`;
    const numberInStock = availableInventory[0];
    const amount = 1;

    cartItem = { ...cartItem, cartID, numberInStock, amount };
    cartItemData = { ...cartItemData, cartID };
  }

  const handleAddToCart = () => {
    dispatch(addItem({ cartItem, cartItemData }));
  };

  return (
    <div className='bg-primary text-primary-content shadow-xl'>
      {/* IMAGE */}
      <figure className='h-56'>
        <Link to={`/products/${id}`}>
          <img src={image} alt={name} className='h-full w-full object-cover' />
        </Link>
      </figure>
      {/* BODY */}
      <div className='mt-4'>
        {/* TITLE & PRICE */}
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>
            <Link to={`/products/${id}`}>{name}</Link>
          </h1>
          <p className='pt-1.5 text-xl font-normal'>{brand}</p>
          <div className='pt-8 relative flex justify-center items-center'>
            {isOnSale && (
              <div className='flex flex-wrap items-center justify-center gap-x-1.5 absolute top-2 text-sm'>
                <span className='font-light line-through'>
                  {formattedPrice(price)}
                </span>
                <span className='badge badge-sm badge-warning font-medium'>
                  -{discount.toFixed(0)}%
                </span>
              </div>
            )}
            <div className='px-2 py-0.5 font-medium text-accent border border-accent w-fit tracking-wider'>
              {formattedPrice(sellingPrice)}
            </div>
          </div>
        </div>
        {/* ADD TO CART || OUT OF STOCK */}
        <div className='py-4 px-8 flex justify-end'>
          {isOutOfStock ? (
            <h6 className='py-2.5 font-normal text-xl tracking-widest capitalize italic text-accent'>
              out of stock
            </h6>
          ) : (
            <button
              type='button'
              className='btn btn-circle btn-secondary text-2xl'
              onClick={handleAddToCart}
            >
              <MdAddShoppingCart />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Slide;
