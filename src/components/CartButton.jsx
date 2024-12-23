import { SingleCartItem } from '../components';
import { formattedPrice } from '../utilities/formatting';
import { GiShoppingCart } from 'react-icons/gi';
import { useSelector } from 'react-redux';

const CartButton = () => {
  const { cartItems, cartItemsData, amount, total } = useSelector(
    (store) => store.cart
  );
  return (
    <div className='indicator mr-3 lg:mr-5 btn btn-primary btn-circle btn-sm dropdown dropdown-bottom dropdown-end dropdown-hover'>
      {/* CART BUTTON */}
      <div tabIndex={0}>
        <span className='indicator-item badge badge-xs lg:badge-sm badge-accent font-medium'>
          {amount}
        </span>
        <GiShoppingCart className='text-2xl' />
      </div>
      {/* CART MODAL */}
      <ul className='px-4 py-2 dropdown-content bg-neutral rounded-sm shadow divide-y divide-primary hidden sm:block'>
        <SingleCartItem cart={cartItems} cartItemsData={cartItemsData} />
        {amount ? (
          <li className='pt-2 pr-2 text-end tracking-wider'>
            Total:
            <span className='ml-4'>{formattedPrice(total)}</span>
          </li>
        ) : (
          <p className='p-8 min-w-max w-screen max-w-sm tracking-widest font-medium text-3xl capitalize'>
            empty cart
          </p>
        )}
      </ul>
    </div>
  );
};
export default CartButton;
