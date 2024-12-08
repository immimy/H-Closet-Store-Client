import noProductsFound from '../assets/cat.svg';
import { BsBagX } from 'react-icons/bs';

const NotFoundContainer = () => {
  return (
    <div className='min-h-full grid grid-rows-2 place-items-center'>
      <div className='flex flex-wrap gap-4 items-center text-error text-2xl'>
        <div className='btn btn-circle btn-error text-xl'>
          <BsBagX />
        </div>
        <h3 className='font-semibold'>No Products Found . . .</h3>
      </div>
      <div className='max-w-2xl'>
        <img src={noProductsFound} alt='no products found' />
      </div>
    </div>
  );
};
export default NotFoundContainer;
