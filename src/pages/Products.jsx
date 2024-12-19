import { customFetch } from '../utilities';
import {
  FilterContainer,
  GridDisplay,
  NotFoundContainer,
  PaginationContainer,
} from '../components';
import { useLoaderData } from 'react-router-dom';

const allProductsQuery = (searchParams) => {
  return {
    queryKey: ['products', searchParams],
    queryFn: async () => {
      const { data } = await customFetch('/products', { params: searchParams });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const searchParams = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );

    const { data, meta } = await queryClient.ensureQueryData(
      allProductsQuery(searchParams)
    );
    return { data, meta, searchParams };
  };

const Products = () => {
  const { data } = useLoaderData();
  const products = data.products;

  return (
    <div className='align-element mt-8 md:mt-12'>
      <FilterContainer />
      {data.productCount ? (
        <>
          <GridDisplay items={products} />
          <PaginationContainer />
        </>
      ) : (
        <NotFoundContainer />
      )}
    </div>
  );
};
export default Products;
