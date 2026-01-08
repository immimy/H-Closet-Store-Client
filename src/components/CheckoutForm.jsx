import { useCallback, useState } from 'react';
import {
  Form,
  useBeforeUnload,
  useBlocker,
  useLoaderData,
} from 'react-router-dom';
import { ModalAlert } from '../components';
import { toast } from 'react-toastify';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { clearCart, deleteOrder } from '../features/cart/cartSlice';
import { customFetch } from '../utilities';
import { useQueryClient } from '@tanstack/react-query';

const CheckoutForm = ({ store }) => {
  const queryClient = useQueryClient();

  const { orderID, clientSecret, continueOrder } = useLoaderData();

  const [isLoading, setIsLoading] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const paymentElementOptions = {
    layout: 'accordion',
  };

  // Checkout the order
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setIsCheckout(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // For continued checkout, pass order ID as query params.
        return_url: continueOrder
          ? `${window.location.origin}/complete?order=${continueOrder._id}`
          : `${window.location.origin}/complete`,
      },
    });

    // Handle an immediate error when confirming the payment,
    // so client can try again.
    if (
      error &&
      (error.type === 'card_error' || error.type === 'validation_error')
    ) {
      setIsCheckout(false);
      toast.error(error.message);
    } else {
      setIsCheckout(false);
      toast.error('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  // Clients are not allowed to pay after leaving Checkout page

  // Delete order in cart state if client reload, close the page,
  // navigate to a different page (typing a URL manually)
  // (Payment intent has status as incomplete.)
  useBeforeUnload(
    useCallback(() => {
      if (!isCheckout) {
        if (orderID && clientSecret) {
          store.dispatch(clearCart());
        }
      }
    }, [isCheckout])
  );

  // Cancel order if client navigate to other page (within our app)
  // (Payment intent has status as canceled.)
  let blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return currentLocation.pathname !== nextLocation.pathname;
  });
  const handleCancel = () => {
    return blocker.reset();
  };
  const handleConfirmLeave = async () => {
    // Clear all queries that query key begin with 'orders'.
    await queryClient.removeQueries({ queryKey: ['orders'] });

    if (orderID && clientSecret) {
      store.dispatch(
        deleteOrder({ orderID, clientSecret, orderStatus: 'Failed' })
      );
    }
    if (continueOrder) {
      try {
        const { _id: orderID, clientSecret } = continueOrder;
        await customFetch.patch(`/orders/${orderID}`, {
          clientSecret,
          status: 'Failed',
        });
      } catch (error) {
        const errorMessage =
          error?.response?.data?.msg ||
          'Something went wrong, please try cancel order again later.';
        toast.error(errorMessage);
      }
    }

    return blocker.proceed();
  };

  return (
    <>
      <Form id='payment-form' onSubmit={handleSubmit} className='w-full mt-6'>
        <PaymentElement options={paymentElementOptions} />
        <button
          id='submit'
          disabled={isLoading || !stripe || !elements}
          className='mt-3 btn btn-block btn-secondary uppercase tracking-widest'
        >
          <span>
            {isLoading ? (
              <div className='loading loading-spinner loading-sm' />
            ) : (
              'checkout'
            )}
          </span>
        </button>
      </Form>
      {blocker.state === 'blocked' && (
        <ModalAlert
          handleCancel={handleCancel}
          handleConfirmLeave={handleConfirmLeave}
        />
      )}
    </>
  );
};
export default CheckoutForm;
