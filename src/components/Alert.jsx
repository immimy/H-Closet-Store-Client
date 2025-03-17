import { HiOutlineInformationCircle } from 'react-icons/hi2';

const Alert = ({ text }) => {
  return (
    <div role='alert' className='alert alert-warning text-neutral-content flex'>
      <div className='text-2xl md:text-3xl'>
        <HiOutlineInformationCircle />
      </div>
      <span className='tracking-widest leading-tight font-medium text-sm md:text-base text-start'>
        {text}
      </span>
    </div>
  );
};
export default Alert;
