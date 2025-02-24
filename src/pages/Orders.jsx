import { redirect, useLoaderData } from 'react-router-dom';
import { OrderRow, PaginationContainer, Title } from '../components';
import { customFetch } from '../utilities';

const allOrdersQuery = (searchParams) => {
  return {
    queryKey: ['orders', searchParams],
    queryFn: async () => {
      const { data } = await customFetch.get('/orders/showAllMyOrders', {
        params: searchParams,
      });
      return data;
    },
  };
};

export const loader = ({ store, queryClient }) => {
  return async ({ request }) => {
    // Restrict client to access this page without login
    const { user } = store.getState().user;
    if (!user) return redirect('/');

    const searchParams = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );
    const { data, meta } = await queryClient.ensureQueryData(
      allOrdersQuery(searchParams)
    );
    return { data, meta };
  };
};

const Orders = () => {
  const { data } = useLoaderData();
  const orders = data.orders;

  if (orders.length < 1) {
    return (
      <div className='align-element'>
        <h1 className='pt-16 md:pt-24 m-auto w-fit text-primary-content uppercase text-4xl italic tracking-widest font-light'>
          empty orders
        </h1>
      </div>
    );
  }

  return (
    <div className='align-element'>
      <div className='pt-12'>
        <Title text='order list' />
      </div>
      <div className='overflow-x-auto p-8'>
        <table className='table md:table-lg table-pin-rows bg-base-300 text-base-content'>
          {/* HEAD */}
          <thead>
            <tr className='bg-secondary text-secondary-content'>
              <th>Order</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Total</th>
              <th>Details</th>
            </tr>
          </thead>
          {/* BODY */}
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <OrderRow order={order} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <PaginationContainer />
    </div>
  );
};
export default Orders;
