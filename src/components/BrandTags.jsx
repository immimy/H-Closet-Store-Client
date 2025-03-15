import { useLoaderData } from 'react-router-dom';

const BrandTags = () => {
  const { meta, searchParams } = useLoaderData();
  const brandTags = meta.enum.brandList;
  const brand = searchParams.brand || 'all';

  const handleBrandTagClicked = (e) => {
    const previousBrandInput = document.getElementById(brand);
    previousBrandInput.setAttribute('disabled', true);

    const currentBrandInput = e.currentTarget.querySelector('input');
    currentBrandInput.removeAttribute('disabled');
  };
  return (
    <>
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
    </>
  );
};
export default BrandTags;
