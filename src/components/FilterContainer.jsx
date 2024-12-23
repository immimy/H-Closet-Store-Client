import { Form, useLoaderData } from 'react-router-dom';
import { FormInput, FormRange, FormSelect, SubmitButton } from '../components';
import { BiSort } from 'react-icons/bi';

const FilterContainer = () => {
  const { meta, searchParams } = useLoaderData();
  const categoryOptions = meta.enum.categoryList;
  const brandTags = meta.enum.brandList;
  const sort = searchParams.sort || '-createdAt';
  const brand = searchParams.brand || 'all';

  const handleBrandTagClicked = (e) => {
    const previousBrandInput = document.getElementById(brand);
    previousBrandInput.setAttribute('disabled', true);

    const currentBrandInput = e.currentTarget.querySelector('input');
    currentBrandInput.removeAttribute('disabled');
  };

  const handlePriceSortToggle = (e) => {
    const input = e.currentTarget.querySelector('input');
    const priceSort = sort === 'price' ? '-price' : 'price';
    input.setAttribute('value', priceSort);
  };

  return (
    <Form>
      {/* Filter */}
      <div className='pt-6 pb-10 px-12 rounded-xl bg-neutral grid gap-2 md:gap-4 sm:grid-cols-2 md:grid-cols-4'>
        <FormInput
          title='search product'
          name='search'
          type='search'
          size='sm'
          searchParams={searchParams}
        />
        <FormSelect
          title='select category'
          name='category'
          options={categoryOptions}
          size='md'
          searchParams={searchParams}
        />
        <FormRange
          title='select price'
          name='price'
          searchParams={searchParams}
        />
        <div className='self-center'>
          <SubmitButton text='search' />
        </div>
      </div>
      {/* Brand Tags */}
      <div className='p-8 flex flex-wrap justify-center gap-4 relative'>
        {brandTags.map((brandTag) => {
          return (
            <button
              key={brandTag}
              name='brand'
              type='submit'
              className='badge badge-lg rounded-none badge-warning p-2 sm:p-4 md:p-6 capitalize'
              onClick={handleBrandTagClicked}
            >
              {brandTag}
              <input
                id={brandTag}
                type='hidden'
                name='brand'
                value={brandTag}
                disabled={brand !== brandTag}
              />
            </button>
          );
        })}
        <button
          name='sort'
          type='submit'
          className='absolute top-1/3 right-0'
          onClick={handlePriceSortToggle}
        >
          <BiSort className='btn btn-sm btn-square btn-neutral p-1' />
          <input type='hidden' name='sort' value={sort} />
        </button>
      </div>
    </Form>
  );
};
export default FilterContainer;
