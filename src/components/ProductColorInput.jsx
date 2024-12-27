const ProductColorInput = ({ title, name, options, value, setValue }) => {
  return (
    <div className='form-control w-full'>
      <div className='label capitalize font-semibold'>
        <span className='label-text text-secondary-content'>{title}</span>
      </div>
      <div className='flex flex-wrap gap-2'>
        {options.map((color) => {
          return (
            <input
              key={color}
              type='radio'
              name={name}
              value={color}
              defaultChecked={value === color}
              className={`appearance-none bg-[#fff] m-0 size-8 md:size-9 border border-accent rounded-full grid place-content-center before:size-7 md:before:size-8 before:rounded-full before:border-2 md:before:border-4 before:border-base-100 before:shadow-md before:transition-all before:scale-0 checked:before:scale-[1]`}
              style={{ backgroundColor: color }}
              onChange={(e) => setValue(e.target.value)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ProductColorInput;
