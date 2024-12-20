import { useState } from 'react';

const ProductSelect = ({ title, name, options }) => {
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
          return (
            <option key={option}>
              {typeof option === 'string' ? option.toUpperCase() : option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default ProductSelect;
