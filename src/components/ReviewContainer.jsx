import noReviewImgSun from '../assets/no-reviews-sun.svg';
import noReviewImgMoon from '../assets/no-reviews-moon.svg';
import { Form, useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PaginationContainer, ReviewCard, Tags, Title } from '../components';
import { useEffect } from 'react';
import { setScrollY } from '../features/scroll/scrollSlice';
import { PiStarFill } from 'react-icons/pi';

const ReviewContainer = () => {
  const dispatch = useDispatch();
  const { scrollY } = useSelector((store) => store.scroll);
  const { theme } = useSelector((store) => store.theme);

  const { singleProduct, productReviews, searchParams } = useLoaderData();
  // Single Product Data
  const { numOfReviews } = singleProduct.data.product;
  // Product Reviews Data
  const { reviewCount, reviews } = productReviews.data;
  const {
    enum: { ratingList },
  } = productReviews.meta;

  // If there is no reviews for this product yet.
  if (!numOfReviews || numOfReviews < 1) {
    return (
      <div className='mt-10'>
        <Title text='Reviews' />
        <div className='mt-4'>
          <h1 className='py-12 text-center text-3xl italic tracking-widest text-primary-content'>
            No Reviews
          </h1>
          <figure className='mx-auto max-w-64 md:max-w-96 transition-all'>
            <img
              src={theme === 'sunTheme' ? noReviewImgSun : noReviewImgMoon}
              alt='no reviews'
              className='w-full object-cover'
            />
          </figure>
        </div>
      </div>
    );
  }

  // Keep scroll Y position when client makes review queries.
  useEffect(() => {
    if (scrollY === 0) return;
    window.scrollTo(0, scrollY);
    dispatch(setScrollY({ scrollYPosition: 0 }));
  }, []);

  return (
    <div id='review-container' className='mt-10 scroll-smooth'>
      <Title text='Reviews' />
      {/* RATING TAGS */}
      <div className='mt-4'>
        <Form className='flex flex-wrap gap-4 md:gap-8 justify-center items-center'>
          <Tags
            name='rating'
            allTags={ratingList}
            selectedTag={searchParams.rating || 'all'}
            offsetTopElementID={'review-container'}
          />
        </Form>
        <div className='mt-4 lg:mr-16 font-medium capitalize text-secondary-content tracking-wide flex flex-wrap justify-end items-center gap-1.5 md:gap-3'>
          ( {searchParams.rating || 'all'}
          <span>
            <PiStarFill />
          </span>
          : {reviewCount} ratings )
        </div>
      </div>
      {/* REVIEWS */}
      {reviewCount < 1 ? (
        <div className='pt-12 pb-10 flex flex-wrap justify-center items-center text-3xl tracking-widest uppercase italic text-secondary-content'>
          no reviews
        </div>
      ) : (
        <div className='mt-6'>
          <ReviewCard reviews={reviews} />
        </div>
      )}
      {/* PAGINATION */}
      <PaginationContainer offsetTopElementID='review-container' />
    </div>
  );
};
export default ReviewContainer;
