const Slide = ({ product }) => {
  const { image, name, brand, price } = product;
  return (
    <div className='card bg-primary shadow-2xl w-full h-96 rounded-none text-primary-content'>
      <figure>
        <img src={image} alt={name} className='h-56 w-full object-cover' />
      </figure>
      <div className='card-body items-center text-center'>
        <h1 className='card-title text-2xl font-semibold'>
          {name}
          <div className='text-sm border px-2 py-0.5 border-secondary'>
            $ {price}
          </div>
        </h1>
        <p className='text-xl font-normal'>{brand}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-sm btn-secondary uppercase rounded-none'>
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default Slide;
