import { useState } from 'react';
import { HiEye } from 'react-icons/hi';

const ResetPasswordInput = ({
  title,
  name,
  size,
  searchParams,
  placeholder,
}) => {
  const [value, setValue] = useState(searchParams?.[name] || '');
  const [passwordType, setPasswordType] = useState('password');
  const [isAtLeastSixCharacters, setIsAtLeastSixCharacters] = useState(true);

  const topPositionEyeToggle = title ? 'top-[62%]' : 'top-1/2';

  const handleInputChange = (e) => {
    const input = e.target.value;
    setValue(input);
    input.length >= 6
      ? setIsAtLeastSixCharacters(true)
      : setIsAtLeastSixCharacters(false);
  };

  return (
    <div className='form-control w-full relative'>
      <div className='label text-neutral-content capitalize font-semibold'>
        <span className='label-text'>{title}</span>
        {!isAtLeastSixCharacters && (
          <span className='label-text-alt text-error'>
            At least 6 characters
          </span>
        )}
      </div>
      <input
        type={passwordType}
        className={`input input-${size} input-bordered rounded-none relative w-full ${
          !isAtLeastSixCharacters && 'input-error'
        }`}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <button
        type='button'
        className={`absolute right-5 ${topPositionEyeToggle}`}
        onClick={() =>
          setPasswordType(passwordType === 'password' ? 'text' : 'password')
        }
      >
        <HiEye className='text-lg' />
      </button>
    </div>
  );
};
export default ResetPasswordInput;
