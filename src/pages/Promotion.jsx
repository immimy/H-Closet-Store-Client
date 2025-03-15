import { Form, useLoaderData } from 'react-router-dom';
import { customFetch } from '../utilities';
import {
  BrandTags,
  GridDisplay,
  NotFoundContainer,
  PaginationContainer,
  SortToggleButton,
} from '../components';

const promotionProductsQuery = (searchParams) => {
  return {
    queryKey: ['promotion', searchParams],
    queryFn: async () => {
      const { data } = await customFetch('/products', {
        params: { promotion: true, ...searchParams },
      });
      return data;
    },
  };
};

export const loader = (queryClient) => {
  return async ({ request }) => {
    const searchParams = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );

    const { data, meta } = await queryClient.ensureQueryData(
      promotionProductsQuery(searchParams)
    );
    return { data, meta, searchParams };
  };
};

const Promotion = () => {
  const { data } = useLoaderData();

  return (
    <div className='align-element mt-2 md:mt-6'>
      {data.productCount ? (
        <>
          <Form>
            <div className='p-8 flex flex-wrap justify-center gap-4 relative'>
              {/* Brand Tags */}
              <BrandTags />
              {/* PRICE SORT TOGGLE */}
              <SortToggleButton sortField='discount' />
            </div>
          </Form>
          <GridDisplay items={data.products} />
          <PaginationContainer />
        </>
      ) : (
        <NotFoundContainer />
      )}
    </div>
  );
};
export default Promotion;
