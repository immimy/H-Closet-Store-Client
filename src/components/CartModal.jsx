import { SingleCartItemContainer } from '../components';
import { GiShoppingCart } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import { useSelector } from 'react-redux';

const CartModal = () => {
  const { cartItems } = useSelector((store) => store.cart);

  const handleOpenCartModal = () => {
    document.getElementById('cart_modal').showModal();
  };

  return (
    <>
      {/* CART ICON */}
      <div className='indicator mr-3 lg:mr-5'>
        <span className='indicator-item badge badge-xs lg:badge-sm badge-accent font-medium'>
          {cartItems.length}
        </span>
        <button
          className='btn btn-primary btn-circle btn-sm'
          onClick={handleOpenCartModal}
        >
          <GiShoppingCart className='text-2xl' />
        </button>
      </div>
      {/* CART MODAL */}
      <dialog id='cart_modal' className='modal modal-top sm:modal-middle'>
        <div className='modal-box rounded-none bg-base-300 text-base-content min-w-max'>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='absolute top-6 right-8 sm:right-6'>
                <ImCross />
              </button>
            </form>
          </div>
          <h1 className='uppercase text-2xl font-bold pb-2 border-b border-base-content'>
            shopping cart
          </h1>
          {cartItems.length ? (
            <SingleCartItemContainer />
          ) : (
            <p className='py-8 text-center tracking-widest font-medium text-3xl capitalize'>
              empty cart
            </p>
          )}
        </div>
      </dialog>
    </>
  );
};
export default CartModal;
