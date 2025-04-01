import { useState } from 'react';
import { RatingContainer } from '../components';

const ReviewPost = ({ index, item }) => {
  const { _id: itemID, name, size, color, image } = item;

  // Max characters per review
  const textareaMaxLength = 300;
  const [leftCharacters, setLeftCharacters] = useState(textareaMaxLength);
  const handleTextareaChange = (e) => {
    const textareaValue = e.target.value.length;
    setLeftCharacters(textareaMaxLength - textareaValue);
  };

  return (
    <div className='p-6 sm:p-8 md:p-12 bg-base-300 rounded-box md:flex md:justify-between md:items-center md:gap-x-8 transition-all'>
      {/* IMAGE & RATING */}
      <div className='text-center'>
        {/* PRODUCT INFO */}
        <div className='mb-4 flex justify-center items-center md:flex-col xl:flex-row gap-x-6 gap-y-4 transition-all'>
          <figure className='h-20 sm:h-32 md:h-40 min-w-20 sm:min-w-32 md:min-w-40 max-w-20 sm:max-w-32 md:max-w-40 rounded-box shadow-lg overflow-hidden transition-all'>
            <img
              src={image}
              alt={itemID}
              className='h-full w-full object-cover'
            />
          </figure>
          <div className='capitalize tracking-wide'>
            <h3 className='text-lg font-semibold'>{name}</h3>
            <p className='font-medium'>
              {size && 'size :'}
              {color && 'color :'}
              <span className='ml-2.5 uppercase'>
                {size}
                {color && (
                  <button
                    className='size-5 rounded-full border border-base-200 shadow'
                    disabled
                    style={{ backgroundColor: color }}
                  />
                )}
              </span>
            </p>
          </div>
        </div>
        {/* STAR RATING */}
        <RatingContainer name={`rating-${index}-${itemID}`} />
      </div>
      {/* COMMENT */}
      <div className='w-full max-w-3xl xl:max-w-2xl transition-all'>
        <div className='mb-2 px-2 flex flex-wrap justify-between items-center w-full max-w-screen-md'>
          <label
            htmlFor={`comment-${itemID}`}
            className='capitalize tracking-widest text-lg font-semibold sm:text-xl'
          >
            comment
          </label>
          <span
            className={`text-sm tracking-wider font-medium ${
              leftCharacters === 0 && 'text-error'
            }`}
          >
            Characters left: {leftCharacters}
          </span>
        </div>
        <div className='w-full max-w-screen-md'>
          <textarea
            name={`comment-${index}-${itemID}`}
            id={`comment-${itemID}`}
            placeholder='Write a review (optional)'
            maxLength={textareaMaxLength}
            className='p-4 sm:p-6 min-h-24 sm:min-h-36 w-full'
            onChange={handleTextareaChange}
          />
        </div>
      </div>
    </div>
  );
};
export default ReviewPost;
