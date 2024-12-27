import { useState } from 'react';

const ProductAmountSelect = ({ title, name, options, numberInStock }) => {
  const [value, setValue] = useState(options[0]);

  return (
    <div className='form-control w-full'>
      <div className='label capitalize font-semibold'>
        <span className='label-text text-secondary-content'>{title}</span>
      </div>
      <select
        name={name}
        className='select select-sm select-bordered rounded-none text-black'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
      {!(numberInStock > 10) && (
        <div className='label relative'>
          <span className='label-text-alt uppercase italic tracking-widest absolute right-0 -bottom-2 text-secondary-content'>
            {numberInStock} available items
          </span>
        </div>
      )}
    </div>
  );
};
export default ProductAmountSelect;
