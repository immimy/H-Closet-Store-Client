import { Link, redirect, useLoaderData } from 'react-router-dom';
import {
  customFetch,
  formattedDateAndTime,
  formattedPrice,
} from '../utilities';
import { clearCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import { SlCheck, SlInfo } from 'react-icons/sl';

const statusContent = {
  succeeded: {
    title: 'Payment Successful',
    text: 'Thank you for your purchase!',
    iconColor: '#30B130',
    icon: <SlCheck />,
  },
  processing: {
    title: 'Payment Processing',
    text: 'Your payment is processing.',
    iconColor: '#6D6E78',
    icon: <SlInfo />,
  },
};

export const loader = ({ stripePromise, store }) => {
  return async ({ request }) => {
    const searchParams = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );
    const clientSecret = searchParams.payment_intent_client_secret;

    // Restrict access to the page
    const { payment_intent, redirect_status } = searchParams;
    if (!clientSecret || !payment_intent || !redirect_status) {
      return redirect('/');
    }

    try {
      const stripe = await stripePromise;
      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      let orderStatus = 'Failed';
      if (paymentIntent.status === 'succeeded') {
        orderStatus = 'Ordered';
      }
      if (paymentIntent.status === 'processing') {
        orderStatus = 'Pending';
      }

      let orderID;
      // For continued checkout
      if (searchParams.order) {
        orderID = searchParams.order;
      } else {
        // For general checkout
        orderID = store.getState().cart.order.orderID;
        store.dispatch(clearCart());
      }
      const { data } = await customFetch.patch(`/orders/${orderID}`, {
        paymentIntentID: paymentIntent.id,
        status: orderStatus,
      });
      const { _id, total, updatedAt } = data.order;

      return {
        orderID: _id,
        amount: total,
        date: updatedAt,
        status: paymentIntent.status,
      };
    } catch (error) {
      toast.error('Something went wrong, please try again.');
      return redirect('/');
    }
  };
};

const Complete = () => {
  const { orderID, amount, date, status } = useLoaderData();
  const content = statusContent[status];

  return (
    <div className='align-element min-h-screen flex flex-col items-center gap-y-6'>
      <div className='mt-24 text-9xl' style={{ color: content.iconColor }}>
        {content.icon}
      </div>
      <div className='text-center'>
        <h3 className='font-bold text-2xl tracking-wider'>{content.title}</h3>
        <p className='tracking-tight text-base-content'>{content.text}</p>
      </div>
      <div className='table w-fit'>
        <table>
          <tbody>
            <tr>
              <th>Amount Paid</th>
              <td className='text-end'>{formattedPrice(amount)}</td>
            </tr>
            <tr>
              <th>Date & Time</th>
              <td className='text-end'>{formattedDateAndTime(date)}</td>
            </tr>
            <tr>
              <th>Order Number</th>
              <td className='text-end'>{orderID}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Link to='/' className='btn tracking-wider'>
        Back to Homepage
      </Link>
    </div>
  );
};
export default Complete;
