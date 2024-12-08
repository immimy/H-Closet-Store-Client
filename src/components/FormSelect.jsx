import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const FormSelect = ({ title, name, options }) => {
  const { searchParams } = useLoaderData();
  const [value, setValue] = useState(searchParams[name]);

  return (
    <div className='form-control w-full'>
      <div className='label text-neutral-content capitalize font-semibold'>
        <span className='label-text'>{title}</span>
      </div>
      <select
        name={name}
        className='select select-sm select-bordered rounded-none'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};
export default FormSelect;
