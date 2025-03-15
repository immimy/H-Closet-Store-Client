import { Link } from 'react-router-dom';
import { formattedPrice, getAvailableProducts } from '../utilities';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const Card = ({ item }) => {
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
  } = item;

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
    <div className='card shadow-2xl'>
      <figure className='h-64'>
        <Link to={`/products/${id}`}>
          <img src={image} alt={name} className='min-h-64 object-cover' />
        </Link>
      </figure>
      <div className='card-body grid'>
        {/* <div className='grid [grid-template-columns: 1fr auto] items-center text-secondary-content'> */}
        <div className='text-secondary-content'>
          <h1 className='card-title text-lg font-bold'>
            <Link to={`/products/${id}`}>{name}</Link>
          </h1>
          <h6 className='text-sm'>{brand}</h6>
          <div className='mt-1.5 font-bold tracking-wider text-end'>
            <h6>{formattedPrice(sellingPrice)}</h6>
            {isOnSale && (
              <div className='flex flex-wrap justify-end items-center gap-1.5'>
                <h6 className='line-through text-base-300 text-sm font-normal'>
                  {formattedPrice(price)}
                </h6>
                <span className='badge badge-sm badge-warning'>
                  -{discount.toFixed(0)}%
                </span>
              </div>
            )}
          </div>
        </div>
        <div className='card-actions justify-end self-end'>
          {isOutOfStock ? (
            <h6 className='mt-2 font-normal text-lg tracking-wider capitalize italic text-accent'>
              out of stock
            </h6>
          ) : (
            <button
              type='button'
              className='btn btn-neutral btn-sm uppercase text-xs font-bold'
              onClick={handleAddToCart}
            >
              add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Card;
