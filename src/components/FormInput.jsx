import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const FormInput = ({ title, name, type }) => {
  const { searchParams } = useLoaderData();
  const [value, setValue] = useState(searchParams[name] || '');

  return (
    <div className='form-control w-full'>
      <div className='label text-neutral-content capitalize font-semibold'>
        <span className='label-text'>{title}</span>
      </div>
      <input
        type={type}
        className='input input-sm input-bordered rounded-none'
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export default FormInput;
