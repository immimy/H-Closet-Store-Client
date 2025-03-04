import { useSelector } from 'react-redux';
import { Form, Link, redirect } from 'react-router-dom';
import {
  Title,
  OrderSummaryList,
  FormRadio,
  SubmitButton,
  FormInput,
  FormTextArea,
  SingleCartItem,
} from '../components';
import { customFetch, formattedPrice } from '../utilities';
import { toast } from 'react-toastify';
import { CgArrowLongLeft } from 'react-icons/cg';
import { ImGift } from 'react-icons/im';
import { clearCart, placeOrder } from '../features/cart/cartSlice';

export const loader = (store) => {
  return () => {
    const { user } = store.getState().user;
    const { cartItems } = store.getState().cart;
    // Restrict client to access the page before log in
    // or client try to access with empty cart
    if (!user || cartItems.length < 1) return redirect('/');
    return null;
  };
};

export const action = ({ store, queryClient }) => {
  return async ({ request }) => {
    const formData = await request.formData();
    const { firstName, lastName, address, giftService, paymentMethod } =
      Object.fromEntries(formData);
    const name = firstName + ' ' + lastName;
    const { cartItems, shippingFee } = store.getState().cart;

    try {
      // Clear all queries that query key begin with 'orders'.
      await queryClient.removeQueries({ queryKey: ['orders'] });

      const { data } = await customFetch.post('/orders', {
        cartItems,
        shippingFee,
        paymentMethod,
        giftService,
        name,
        address,
      });

      if (paymentMethod === 'cash on delivery') {
        store.dispatch(clearCart());
        return redirect('/orders');
      }
      if (paymentMethod === 'credit card') {
        const order = {
          orderID: data.order._id,
          clientSecret: data.order.clientSecret,
          giftService: data.order.giftService,
          shippingAddress: data.order.shippingAddress,
        };
        store.dispatch(placeOrder({ order }));
        return redirect('/checkout');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Place Order Failed.';
      toast.error(errorMessage);
      return null;
    }
  };
};

const Cart = () => {
  const { cartItems, cartItemsData, cartTotal, shippingFee, orderTotal } =
    useSelector((store) => store.cart);

  return (
    <div className='align-element py-8 lg:py-16 text-secondary-content lg:grid lg:grid-cols-3'>
      {/* SHOPPING CART */}
      <section className='px-4 lg:col-span-2'>
        <div className='pb-4 flex justify-between items-center'>
          <Title text='shopping cart' />
          <span className='text-lg font-medium'>{cartItems.length} Items</span>
        </div>
        <hr className='text-base-100' />
        <div>
          <ul className='px-4 py-2'>
            {cartItems.map((item, index, cart) => {
              const itemData = cartItemsData[index];
              return (
                <li key={`${item.cartID}`} className='pt-4 pb-4'>
                  <SingleCartItem
                    cartItem={item}
                    cartItemData={itemData}
                    showSubtotal={true}
                    oneItemLeftInCart={cart.length < 2 ? true : false}
                  />
                </li>
              );
            })}
          </ul>
          <hr className='text-base-100' />
          <Link
            to='/products'
            className='pt-8 flex items-center gap-x-2 text-neutral font-medium tracking-wider'
          >
            <CgArrowLongLeft className='text-3xl' />
            Continue Shopping
          </Link>
        </div>
      </section>
      <Form
        method='post'
        className='mt-6 lg:mt-0 flex flex-col gap-y-4 md:flex-row md:gap-x-4 md:items-start lg:flex-col'
      >
        {/* SHIPPING ADDRESS */}
        <section className='p-4 bg-base-300 text-base-content md:col-span-1 md:w-full'>
          <Title
            text='shipping address'
            textColor='text-base-content'
            hrColor='border-base-content'
          />
          <div className='p-4'>
            <FormInput
              title='first name'
              name='firstName'
              type='text'
              size='input-sm'
              required={true}
            />
            <FormInput
              title='last name'
              name='lastName'
              type='text'
              size='input-sm'
              required={true}
            />
            <FormTextArea title='address' required={true} />
          </div>
        </section>
        {/* ORDER SUMMARY */}
        <section className='p-4 bg-base-300 text-base-content relative md:w-full'>
          <Title
            text='order summary'
            textColor='text-base-content'
            hrColor='border-base-content'
          />
          {/* CART DETAILS */}
          <div className='p-4'>
            <OrderSummaryList
              title='subtotal'
              value={formattedPrice(cartTotal)}
            />
            <OrderSummaryList
              title='shipping fee'
              value={formattedPrice(shippingFee)}
              text={
                cartTotal <= 500 &&
                `Purchase more than ${formattedPrice(
                  500
                )} to obtain free shipping.`
              }
            />
            <OrderSummaryList
              title='total'
              value={formattedPrice(orderTotal)}
            />
          </div>
          {/* GIFT SERVICE */}
          <div className='px-4 py-6 form-control bg-base-100 rounded-md text-center'>
            <h6 className='font-medium'>
              Would you like to take a gift wrapping service?
            </h6>
            <label htmlFor='gift-service' className='mt-2 px-6 flex gap-x-4'>
              <input
                type='checkbox'
                id='gift-service'
                name='giftService'
                className='checkbox checkbox-secondary'
              />
              <span className='label-text text-base-content flex items-center capitalize gap-x-1.5'>
                <ImGift /> gift wrapping service
              </span>
            </label>
          </div>
          {/* PAYMENT METHOD */}
          <div className='p-4 form-control'>
            <h6 className='font-medium'>Payment Method</h6>
            <FormRadio
              name='paymentMethod'
              id='cash on delivery'
              value='cash on delivery'
              text='cash on delivery'
              required={true}
            />
            <FormRadio
              name='paymentMethod'
              id='credit card'
              value='credit card'
              text='credit card'
              required={true}
            />
          </div>
          {/* SUBMIT BUTTON */}
          <div className='absolute top-full left-0 w-full mt-4'>
            <SubmitButton text='confirm order' color='btn-secondary' />
          </div>
        </section>
      </Form>
    </div>
  );
};
export default Cart;
