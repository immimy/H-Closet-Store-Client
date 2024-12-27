import { Link } from 'react-router-dom';
import { SingleCartItem } from '../components';
import { useSelector } from 'react-redux';

const SingleCartItemContainer = () => {
  const { cartItems, cartItemsData } = useSelector((store) => store.cart);

  return (
    <ul className='px-4 py-2 divide-y divide-base-200'>
      {cartItems.map((item, index) => {
        const itemData = cartItemsData[index];
        return (
          <li key={`${item.cartID}`} className='pt-2 pb-2 first:pt-0 last:pb-0'>
            <SingleCartItem cartItem={item} cartItemData={itemData} />
          </li>
        );
      })}
      <li>
        <Link
          to='/cart'
          className='my-4 btn btn-secondary btn-block uppercase font-bold'
        >
          proceed to checkout
        </Link>
      </li>
    </ul>
  );
};
export default SingleCartItemContainer;
