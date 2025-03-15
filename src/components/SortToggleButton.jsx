import { BiSort } from 'react-icons/bi';
import { useLoaderData } from 'react-router-dom';

const SortToggleButton = ({ sortField }) => {
  const { searchParams } = useLoaderData();
  const sort = searchParams.sort || '-createdAt';

  const handlePriceSortToggle = (e) => {
    const sortValue = sort === sortField ? `-${sortField}` : sortField;
    e.currentTarget.setAttribute('value', sortValue);
  };

  return (
    <button
      type='submit'
      className='absolute top-1/3 right-0'
      name='sort'
      value={sort}
      onClick={handlePriceSortToggle}
    >
      <BiSort className='btn btn-sm btn-square btn-neutral p-1' />
    </button>
  );
};
export default SortToggleButton;
