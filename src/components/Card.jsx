import { Link } from 'react-router-dom';
import { formattedPrice } from '../utilities/formatting';
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
  } = item;

  // Set up adding data to cart
  // (color, size, amount props are appended when add product to cart)
  const cartItem = { id, name, category, image, price };
  const cartItemData = { option: size || color || null, inventory };

  const handleAddToCart = () => {
    const selectedSize = size?.[0];
    const selectedColor = color?.[0];
    const amount = 1;

    const newCartItem = {
      ...cartItem,
      size: selectedSize,
      color: selectedColor,
      amount,
    };

    dispatch(addItem({ cartItem: newCartItem, cartItemData }));
  };

  return (
    <div className='card shadow-2xl'>
      <figure className='h-64'>
        <Link to={`/products/${id}`}>
          <img src={image} alt={name} className='min-h-64 object-cover' />
        </Link>
      </figure>
      <div className='card-body grid'>
        <div className='grid [grid-template-columns: 1fr auto] items-center text-secondary-content'>
          <h1 className='card-title text-lg font-bold'>
            <Link to={`/products/${id}`}>{name}</Link>
          </h1>
          <h6 className='col-start-2 row-span-2 text-right font-bold tracking-wider'>
            {formattedPrice(price)}
          </h6>
          <p className='text-sm'>{brand}</p>
        </div>
        <div className='card-actions justify-end self-end'>
          <button
            type='button'
            className='btn btn-neutral btn-sm uppercase text-xs font-bold'
            onClick={handleAddToCart}
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;
