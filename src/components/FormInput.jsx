import { useState } from 'react';

const FormInput = ({
  title,
  name,
  type,
  size,
  searchParams,
  placeholder,
  required,
  defaultValue,
}) => {
  const [value, setValue] = useState(
    searchParams?.[name] || defaultValue || ''
  );

  return (
    <div className='form-control w-full'>
      <div className='label text-neutral-content capitalize font-semibold'>
        <span className='label-text'>{title}</span>
      </div>
      <input
        type={type}
        className={`input ${size} input-bordered rounded-none`}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        required={required}
      />
    </div>
  );
};
export default FormInput;
