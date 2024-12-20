import { Link } from 'react-router-dom';
import { formattedPrice } from '../utilities/formatting';

const Card = ({ item }) => {
  const { _id, image, name, brand, price } = item;

  return (
    <Link to={`/products/${_id}`} className='card shadow-2xl'>
      <figure className='h-64'>
        <img src={image} alt={name} className='min-h-64 object-cover' />
      </figure>
      <div className='card-body grid'>
        <div className='grid [grid-template-columns: 1fr auto] items-center text-secondary-content'>
          <h1 className='card-title text-lg font-bold'>{name}</h1>
          <h6 className='col-start-2 row-span-2 text-right font-bold'>
            $ {formattedPrice(price)}
          </h6>
          <p className='text-sm'>{brand}</p>
        </div>
        <div className='card-actions justify-end self-end'>
          <button
            type='button'
            className='btn btn-neutral btn-sm uppercase text-xs font-bold'
          >
            add to cart
          </button>
        </div>
      </div>
    </Link>
  );
};
export default Card;
