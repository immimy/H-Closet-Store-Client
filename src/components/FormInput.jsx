import { useState } from 'react';

const FormInput = ({ title, name, type, size, searchParams }) => {
  const [value, setValue] = useState(searchParams?.[name] || '');

  return (
    <div className='form-control w-full'>
      <div className='label text-neutral-content capitalize font-semibold'>
        <span className='label-text'>{title}</span>
      </div>
      <input
        type={type}
        className={`input input-${size} input-bordered rounded-none`}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export default FormInput;
