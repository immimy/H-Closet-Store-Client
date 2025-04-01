import { useLoaderData } from 'react-router-dom';
import { PiStarFill } from 'react-icons/pi';

const OverallRatingContainer = () => {
  const data = useLoaderData();
  const {
    product: { avgRating, numOfReviews },
    countEachRating,
  } = data.singleProduct.data;
  const eachRatingArray = [...countEachRating];

  const allRatings = Array.from({ length: 5 }, (_, i) => {
    const index = eachRatingArray.findIndex((item) => item._id === i + 1);
    const value = eachRatingArray[index]?.count;
    if (index !== -1) eachRatingArray.splice(index, 1);

    return (
      <div key={i + 1} className='flex items-center space-x-4'>
        <span className='flex items-center text-base-content font-medium text-xl'>
          {i + 1} <PiStarFill className='ml-0.5' />
        </span>
        <progress
          className='progress progress-secondary'
          value={index === -1 ? 0 : value}
          max={numOfReviews}
        />
      </div>
    );
  });

  return (
    <div className='sm:flex px-6 md:px-12 transition-all'>
      {/* OVERALL RATING */}
      <div className='stats bg-base-200 text-base-content shadow w-full sm:w-auto sm:min-w-72 lg:min-w-96 rounded-b-none sm:rounded-bl-box sm:rounded-tr-none transition-all'>
        <div className='stat px-16 py-5 sm:px-10 lg:px-16 transition-all'>
          <div className='stat-title tracking-widest font-bold text-lg'>
            Overall Rating
          </div>
          <div className='stat-value relative'>
            {avgRating?.toFixed(1) || '0.0'}
            <div className='text-5xl text-warning absolute right-0 top-0'>
              <PiStarFill />
            </div>
          </div>
          <div className='mt-2 stat-desc tracking-wider font-medium badge badge-warning'>
            {numOfReviews || 0} Reviews
          </div>
        </div>
      </div>
      {/* NUMBER OF EACH RATING */}
      <div className='p-6 lg:px-16 flex flex-col-reverse bg-base-200 rounded-box rounded-t-none sm:flex-grow sm:rounded-bl-none sm:rounded-tr-box sm:border-l-2 sm:border-secondary transition-all'>
        {allRatings}
      </div>
    </div>
  );
};
export default OverallRatingContainer;
