const FormRadio = ({ id, name, value, text, required }) => {
  return (
    <label htmlFor={id} className='mt-2 px-6 flex gap-x-4'>
      <input
        type='radio'
        id={id}
        name={name}
        value={value}
        required={required}
        className='radio radio-secondary'
      />
      <span className='label-text text-base-content flex items-center capitalize gap-x-1.5'>
        {text}
      </span>
    </label>
  );
};
export default FormRadio;
