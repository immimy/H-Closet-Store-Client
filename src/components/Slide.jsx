import { MdAddShoppingCart } from 'react-icons/md';
import { formattedPrice } from '../utilities/formatting';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

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
    <div className='card bg-primary shadow-2xl h-96 rounded-none text-primary-content'>
      <figure className='h-64'>
        <Link to={`/products/${id}`}>
          <img src={image} alt={name} className='min-h-64 object-cover' />
        </Link>
      </figure>
      <div className='card-body text-center'>
        <div className='flex items-center justify-center gap-2 sm:flex-col'>
          <h1 className='card-title text-2xl font-semibold'>
            <Link to={`/products/${id}`}>{name}</Link>
          </h1>
          <div className='px-2 py-0.5 text-sm font-medium text-accent border border-accent w-fit tracking-wider'>
            {formattedPrice(price)}
          </div>
        </div>
        <p className='text-xl font-normal'>{brand}</p>
        <div className='card-actions justify-end'>
          <button
            type='button'
            className='btn btn-circle btn-sm btn-secondary text-xl'
            onClick={handleAddToCart}
          >
            <MdAddShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Slide;
