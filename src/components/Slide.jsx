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
    price,
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
    <div className='card bg-primary shadow-2xl h-96 rounded-none text-primary-content'>
      <figure className='h-64'>
        <Link to={`/products/${id}`}>
          <img src={image} alt={name} className='min-h-64 object-cover' />
        </Link>
      </figure>
      <div className='card-body text-center'>
        {/* <div className='flex items-center justify-center gap-2 sm:flex-col'>
          <h1 className='card-title text-2xl font-semibold'>
            <Link to={`/products/${id}`}>{name}</Link>
          </h1>
          <div className='px-2 py-0.5 text-sm font-medium text-accent border border-accent w-fit tracking-wider'>
            {formattedPrice(price)}
          </div>
        </div>
        <p className='text-xl font-normal'>{brand}</p> */}
        <div className='grid place-items-center gap-y-2'>
          <h1 className='card-title text-2xl font-semibold'>
            <Link to={`/products/${id}`}>{name}</Link>
          </h1>
          <p className='text-xl font-normal'>{brand}</p>
          <div className='mt-2 px-2 py-0.5 text-sm font-medium text-accent border border-accent w-fit tracking-wider'>
            {formattedPrice(price)}
          </div>
        </div>
        <div className='card-actions justify-end'>
          {isOutOfStock ? (
            <h6 className='mt-2 font-normal text-xl tracking-widest capitalize italic text-accent'>
              out of stock
            </h6>
          ) : (
            <button
              type='button'
              className='btn btn-circle btn-sm btn-secondary text-xl'
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
