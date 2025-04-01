import { Form, redirect, useLoaderData } from 'react-router-dom';
import { SubmitButton, Title, ReviewPost, Alert } from '../components';
import { toast } from 'react-toastify';
import { customFetch } from '../utilities';
import { singleOrderQuery } from './SingleOrder';

export const loader = ({ store, queryClient }) => {
  return async ({ params }) => {
    // Restrict client to access this page without login
    const { user } = store.getState().user;
    if (!user) return redirect('/');

    const { order } = await queryClient.ensureQueryData(
      singleOrderQuery(params.id)
    );

    // Restrict client to access reviews route
    // If that order is not paid yet
    // or exceeds 2 weeks from the last order update.
    const reviewStatuses = ['Ordered', 'Packed', 'In Transit', 'Delivered'];
    const isExceedTwoWeeks =
      Date.now() >
      new Date(order.updatedAt).getTime() + 1000 * 60 * 60 * 24 * 7 * 2;
    if (!reviewStatuses.includes(order.status) || isExceedTwoWeeks) {
      toast.error('Cannot submit reviews after 2 weeks.');
      return redirect('/orders');
    }
    // Redirect if reviews were already submitted.
    if (order.countReview > 0) {
      toast.error('You already submitted reviews for this order.');
      return redirect('/orders');
    }

    return { order };
  };
};

export const action = ({ queryClient }) => {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // collect data into array of objects grouped by orderItemID
    let reviews = []; // {orderItem, rating, comment}
    for (const [key, value] of Object.entries(data)) {
      const [prop, index, id] = key.split('-');

      // only add {orderItem} to array at the first time
      if (!reviews[index]) {
        reviews[index] = { orderItem: id };
      }
      // check if client provide all product ratings
      if (prop === 'rating' && value < 1) {
        return toast.error('Please provide all product ratings.');
      }

      // add rating or comment prop to array
      reviews[index] = { ...reviews[index], [prop]: value };
    }

    try {
      await customFetch.post('reviews', {
        order: params.id,
        reviews,
      });
      await queryClient.removeQueries({ queryKey: ['orders'] });
      await queryClient.removeQueries({ queryKey: ['product'] });
      toast.success('Success to submit reviews!');
      return redirect('/orders');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg ||
        'Failed to submit reviews, please try again.';
      toast.error(errorMessage);
      return null;
    }
  };
};

const Reviews = () => {
  const {
    order: { orderItems },
  } = useLoaderData();

  return (
    <div className='align-element mt-8 md:mt-12'>
      <div className='mb-4'>
        <Alert text='Each rating has mock comments, making a single character sufficient.' />
      </div>
      <Title text='leave your reviews' tracking='tracking-wider' />
      <Form method='post' className='mt-6'>
        {orderItems.map((item, index) => {
          return (
            <div key={`review-${item._id}`} className='mb-2 sm:mb-4 md:mb-8'>
              <ReviewPost index={index} item={item} />
            </div>
          );
        })}
        <SubmitButton text='submit' tracking='tracking-widest' />
      </Form>
    </div>
  );
};
export default Reviews;
