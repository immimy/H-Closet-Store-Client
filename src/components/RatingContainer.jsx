const RatingContainer = ({ name, rating }) => {
  // Rating in review card
  if (rating) {
    return (
      <div className='rating rating-sm md:rating-md'>
        {Array.from({ length: 5 }, (_, i) => {
          return (
            <input
              key={`${name}-${i + 1}`}
              type='radio'
              className='mask mask-star-2 bg-warning pointer-events-none'
              defaultChecked={i + 1 === rating}
              disabled={true}
            ></input>
          );
        })}
      </div>
    );
  }

  // Ratings in review post
  return (
    <div className='rating sm:rating-lg'>
      {Array.from({ length: 6 }, (_, i) => {
        return (
          <input
            key={`${name}-${i}`}
            type='radio'
            name={name}
            className={
              i === 0 ? 'rating-hidden' : 'mask mask-star-2 bg-orange-400'
            }
            aria-label={i === 0 ? 'clear' : `${i} star`}
            value={i}
            defaultChecked={i === 0}
          />
        );
      })}
    </div>
  );
};
export default RatingContainer;
