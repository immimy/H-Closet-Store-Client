import { Form, useLoaderData } from 'react-router-dom';
import {
  FormInput,
  FormRange,
  FormSelect,
  SortToggleButton,
  SubmitButton,
  Tags,
} from '../components';

const FilterContainer = () => {
  const { meta, searchParams } = useLoaderData();
  const categoryOptions = meta.enum.categoryList;

  return (
    <Form>
      {/* Filter */}
      <div className='pt-6 pb-10 px-12 rounded-xl bg-neutral grid gap-2 md:gap-4 sm:grid-cols-2 md:grid-cols-4'>
        <FormInput
          title='search product'
          name='search'
          type='search'
          size='input-sm'
          searchParams={searchParams}
        />
        <FormSelect
          title='select category'
          name='category'
          options={categoryOptions}
          size='select-sm'
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
      <div className='p-8 flex flex-wrap justify-center gap-4 relative'>
        {/* Brand Tags */}
        <Tags
          name='brand'
          allTags={meta.enum.brandList}
          selectedTag={searchParams.brand || 'all'}
        />
        {/* PRICE SORT TOGGLE */}
        <SortToggleButton sortField='price' />
      </div>
    </Form>
  );
};
export default FilterContainer;
