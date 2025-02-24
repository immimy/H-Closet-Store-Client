const FormTextArea = ({ title, required, defaultValue }) => {
  return (
    <label className='form-control'>
      <div className='label text-neutral-content capitalize font-semibold'>
        <span className='label-text'>{title}</span>
      </div>
      <textarea
        name='address'
        className='textarea textarea-bordered h-24'
        required={required}
        defaultValue={defaultValue}
      />
    </label>
  );
};
export default FormTextArea;
