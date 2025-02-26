import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { customFetch, getCountdownTime } from '../utilities';
import { VscError } from 'react-icons/vsc';
import { BiErrorCircle } from 'react-icons/bi';
import {
  OrderAlert,
  OrderDetailsContainer,
  OrderSummaryContainer,
} from '../components';

const singleOrderQuery = (id) => {
  return {
    queryKey: ['order', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/orders/${id}`);
      return data;
    },
  };
};

export const loader = ({ store, queryClient }) => {
  return async ({ params }) => {
    // Restrict client to access this page without login
    const { user } = store.getState().user;
    if (!user) return redirect('/');

    const { order } = await queryClient.ensureQueryData(
      singleOrderQuery(params.id)
    );
    return { order };
  };
};

const SingleOrder = () => {
  const { order } = useLoaderData();
  const {
    status,
    orderItems,
    subtotal: cartTotal,
    shippingFee,
    total: orderTotal,
    giftService,
    paymentMethod,
  } = order;
  const { name, address } = order.shippingAddress;

  const placedOrderStatus = ['Ordered', 'Packed', 'In Transit', 'Delivered'];
  const statusIndex = placedOrderStatus.indexOf(status);

  // Set up countdown clock
  const countDownDate =
    new Date(order.createdAt).getTime() + 1000 * 60 * 60 * 24;
  const [countdownTime, setCountdownTime] = useState(
    getCountdownTime(countDownDate - Date.now())
  );

  useEffect(() => {
    // Update the countdown every 1 second
    const intID = setInterval(() => {
      // Set countdown only for 'Pending' order
      if (status !== 'Pending') return clearInterval(intID);

      const duration = countDownDate - Date.now();

      if (duration < 0) {
        return () => {
          clearInterval(intID);
          setCountdownTime({ hour: 0, minute: 0, second: 0 });
        };
      }

      setCountdownTime(getCountdownTime(duration));
    }, 1000);

    return () => {
      clearInterval(intID);
    };
  }, []);

  return (
    <div className='align-element'>
      {/* ORDER STATUS ALERT */}
      {['Failed', 'Canceled'].includes(status) && (
        <OrderAlert
          value={status}
          icon={<VscError />}
          alertColor='alert-error'
        />
      )}
      {['Pending'].includes(status) && (
        <OrderAlert
          value={status}
          icon={<BiErrorCircle />}
          alertColor='alert-warning'
          element={
            <Link
              to={`/checkout?order=${order._id}`}
              className='btn btn-sm bg-base-300 border-base-300 text-base-content uppercase tracking-wider'
            >
              checkout
            </Link>
          }
          countdownTime={countdownTime}
        />
      )}
      {/* ORDER STATUS STEP */}
      {placedOrderStatus.includes(status) && (
        <div className='mt-8 flex justify-center text-secondary-content'>
          <ul className='flex-1 steps'>
            {placedOrderStatus.map((status, index) => {
              const isChecked = statusIndex !== -1 && statusIndex >= index;
              return (
                <li
                  key={index}
                  data-content={isChecked ? '✓' : ''}
                  className={`step ${
                    isChecked && 'step-neutral'
                  } tracking-wider`}
                >
                  {status}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <section className='mt-12 text-secondary-content lg:grid lg:grid-cols-3 lg:gap-x-6'>
        {/* ORDER DETAILS */}
        <div className='lg:col-span-2'>
          <OrderDetailsContainer
            cartItems={orderItems}
            continueOrder={orderItems}
          />
        </div>
        {/* ORDER SUMMARY */}
        <OrderSummaryContainer
          name={name}
          address={address}
          cartTotal={cartTotal}
          shippingFee={shippingFee}
          orderTotal={orderTotal}
          giftService={giftService}
          paymentMethod={paymentMethod}
          mdFlexDirection='md:flex-col'
        />
      </section>
    </div>
  );
};
export default SingleOrder;
