import { MdAddShoppingCart } from 'react-icons/md';
import { formattedPrice } from '../utilities/formatting';
import { Link } from 'react-router-dom';

const Slide = ({ product }) => {
  const { _id, image, name, brand, price } = product;

  return (
    <Link
      to={`/products/${_id}`}
      className='card bg-primary shadow-2xl w-full h-96 rounded-none text-primary-content'
    >
      <figure>
        <img src={image} alt={name} className='h-56 w-full object-cover' />
      </figure>
      <div className='card-body text-center'>
        <div className='flex items-center justify-center gap-2 sm:flex-col'>
          <h1 className='card-title text-2xl font-semibold'>{name}</h1>
          <div className='text-sm border px-2 py-0.5 border-secondary w-fit'>
            $ {formattedPrice(price)}
          </div>
        </div>
        <p className='text-xl font-normal'>{brand}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-circle btn-sm btn-secondary text-xl'>
            <MdAddShoppingCart />
          </button>
        </div>
      </div>
    </Link>
  );
};
export default Slide;
