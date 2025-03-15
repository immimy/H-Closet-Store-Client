import { HiOutlineChevronDoubleLeft } from 'react-icons/hi';

const CarouselArrow = ({ onClick, rotate, id }) => {
  return (
    <div
      id={id}
      className={`next-slick-arrow ${rotate} transition-all`}
      onClick={onClick}
    >
      <div className='text-2xl btn btn-circle btn-accent btn-sm'>
        <HiOutlineChevronDoubleLeft />
      </div>
    </div>
  );
};

export default CarouselArrow;
