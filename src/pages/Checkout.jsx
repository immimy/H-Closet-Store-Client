import {
  Title,
  CheckoutForm,
  OrderDetailsContainer,
  OrderSummaryContainer,
} from '../components';
import { useSelector } from 'react-redux';
import { redirect, useLoaderData } from 'react-router-dom';
import { customFetch } from '../utilities';
import { toast } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';

export const loader = (store) => {
  return async ({ request }) => {
    // For continued checkout
    // In case client accidentally leave the page
    // (reload, close the page or navigate to external page)
    const { order: orderID } = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );
    if (orderID) {
      try {
        const { data } = await customFetch.get(`orders/${orderID}`);

        // Redirect if checkout timed out.
        const countDownDate =
          new Date(data.order.createdAt).getTime() + 1000 * 60 * 60 * 24;
        if (countDownDate - Date.now() < 0) {
          toast.error('Checkout timed out.');
          return redirect('/');
        }

        // Return result here is used to differentiate between continued checkout and general checkout.
        return { continueOrder: data.order };
      } catch (error) {
        const errorMessage =
          error?.response?.data?.msg || 'Failed to continue checking out.';
        toast.error(errorMessage);
        return redirect('/');
      }
    }

    // For general checkout
    const { order } = store.getState().cart;
    // Restrict navigation to Checkout page directly
    if (!order) return redirect('/');
    // Return result here is used to differentiate between continued checkout and general checkout.
    return {
      orderID: order.orderID,
      clientSecret: order.clientSecret,
    };
  };
};

const Checkout = ({ store, stripePromise }) => {
  let cartItems,
    cartTotal,
    shippingFee,
    orderTotal,
    clientSecret,
    giftService,
    name,
    address,
    discounts;

  // Continued checkout
  const { continueOrder } = useLoaderData();
  if (continueOrder) {
    cartItems = continueOrder.orderItems;
    cartTotal = continueOrder.subtotal;
    shippingFee = continueOrder.shippingFee;
    orderTotal = continueOrder.total;
    clientSecret = continueOrder.clientSecret;
    giftService = continueOrder.giftService;
    name = continueOrder.shippingAddress.name;
    address = continueOrder.shippingAddress.address;
    discounts = continueOrder.discounts;
  } else {
    // General checkout
    const cartState = useSelector((store) => store.cart);
    cartItems = cartState.cartItems;
    cartTotal = cartState.cartTotal;
    shippingFee = cartState.shippingFee;
    orderTotal = cartState.orderTotal;
    clientSecret = cartState.order.clientSecret;
    giftService = cartState.order.giftService;
    name = cartState.order.shippingAddress.name;
    address = cartState.order.shippingAddress.address;
    discounts = cartState.discounts;
  }

  // Stripe options
  const { theme } = useSelector((store) => store.theme);
  const options = {
    clientSecret,
    appearance: { theme: theme === 'sunTheme' ? 'flat' : 'night' },
    loader: 'auto',
  };

  return (
    <div className='align-element py-8 lg:py-16 text-secondary-content lg:grid lg:grid-cols-3'>
      <section className='px-4 lg:col-span-2'>
        {/* ORDER DETAILS */}
        <OrderDetailsContainer
          cartItems={cartItems}
          continueOrder={continueOrder}
        />
        {/* ORDER SUMMARY */}
        <OrderSummaryContainer
          name={name}
          address={address}
          cartTotal={cartTotal}
          shippingFee={shippingFee}
          orderTotal={orderTotal}
          giftService={giftService}
          mdFlexDirection='md:flex-row'
          discounts={discounts}
        />
      </section>
      {/* CHECKOUT FORM */}
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <section className='mt-4 p-8'>
            <Title text='payment details' />
            <CheckoutForm store={store} />
          </section>
        </Elements>
      )}
    </div>
  );
};
export default Checkout;
