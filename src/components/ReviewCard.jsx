import { FaUserCircle } from 'react-icons/fa';
import RatingContainer from './RatingContainer';
import { displayActualDateWithinMonth } from '../utilities/formatting';

const ReviewCard = ({ reviews }) => {
  return (
    <>
      {reviews.map((review) => {
        const { user, rating, comment, updatedAt } = review;

        return (
          <div
            key={review._id}
            className='mt-4 mx-auto px-4 py-2 sm:px-12 sm:py-4 md:px-16 md:py-8 bg-secondary text-secondary-content rounded-box shadow-xl transition-all max-w-5xl'
          >
            {/* USER CONTAINER */}
            <div className='flex flex-wrap items-center gap-x-3 relative'>
              {/* DATE */}
              <span className='absolute top-0 right-0 text-sm tracking-wider font-medium'>
                {displayActualDateWithinMonth(updatedAt)}
              </span>
              {/* AVATAR */}
              <div className='text-5xl md:text-6xl text-neutral'>
                <FaUserCircle />
              </div>
              {/* USERNAME & RATINGS */}
              <div className='capitalize font-medium tracking-wider'>
                <h4 className='font-bold'>{user?.username || 'anonymous'}</h4>
                <RatingContainer
                  name={`review-${review._id}`}
                  rating={rating}
                />
              </div>
            </div>
            {/* COMMENT CONTAINER */}
            {comment && <p className='mt-4'>{comment}</p>}
          </div>
        );
      })}
    </>
  );
};
export default ReviewCard;
