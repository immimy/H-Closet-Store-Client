const CircleBadge = ({ topic, icon }) => {
  return (
    <div className='bg-secondary text-secondary-content size-28 lg:size-32 rounded-full shadow-xl flex justify-center items-center relative'>
      <span className='absolute top-4 left-1/2 -translate-x-1/2 text-2xl lg:text-3xl'>
        {icon}
      </span>
      <h6 className='p-4 mt-6 tracking-wide text-center uppercase text-sm lg:text-base font-semibold'>
        {topic}
      </h6>
    </div>
  );
};
export default CircleBadge;
