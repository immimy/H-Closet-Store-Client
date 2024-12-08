import { useState } from 'react';
import { formattedPrice } from '../utilities/formatting';
import { useLoaderData } from 'react-router-dom';

const FormRange = ({ title, name }) => {
  const { searchParams } = useLoaderData();
  const minPrice = 0;
  const maxPrice = 200;
  const priceStep = 10;
  const [selectedPrice, setSelectedPrice] = useState(
    searchParams[name] || maxPrice
  );

  return (
    <div className='form-control w-full'>
      <div className='label text-neutral-content capitalize font-semibold'>
        <span className='label-text'>{title}</span>
        <span className='label-text-alt'>${formattedPrice(selectedPrice)}</span>
      </div>
      <input
        type='range'
        className='range range-accent'
        name={name}
        min={minPrice}
        max={maxPrice}
        step={priceStep}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
      />
      <div className='label text-neutral-content capitalize'>
        <span className='label-text-alt'>{minPrice}</span>
        <span className='label-text-alt'>max: ${formattedPrice(maxPrice)}</span>
      </div>
    </div>
  );
};
export default FormRange;
