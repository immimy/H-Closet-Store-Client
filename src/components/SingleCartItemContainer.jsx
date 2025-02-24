import { Link } from 'react-router-dom';
import { SingleCartItem } from '../components';
import { useSelector } from 'react-redux';

const SingleCartItemContainer = () => {
  const { cartItems, cartItemsData } = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.user);

  const handleProceedToCheckout = () => {
    document.getElementById('cart_modal-close_button').click();
  };

  return (
    <ul className='px-4 py-2 divide-y divide-base-200'>
      {cartItems.map((item, index) => {
        const itemData = cartItemsData[index];
        return (
          <li key={`${item.cartID}`} className='pt-2 pb-2'>
            <SingleCartItem cartItem={item} cartItemData={itemData} />
          </li>
        );
      })}
      <li>
        <Link
          to={user ? '/cart' : '/login'}
          className='my-4 btn btn-secondary btn-block uppercase font-bold'
          onClick={handleProceedToCheckout}
        >
          {user ? 'proceed to checkout' : 'login'}
        </Link>
      </li>
    </ul>
  );
};
export default SingleCartItemContainer;
