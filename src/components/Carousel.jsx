import Slider from 'react-slick';
import { Slide, CarouselArrow } from '../components';

const Carousel = ({ products }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    nextArrow: <CarouselArrow baseColor='#B7B7B7' />,
    prevArrow: <CarouselArrow baseColor='#B7B7B7' />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0px',
        },
      },
    ],
  };
  return (
    <div className='pt-6'>
      <Slider {...settings}>
        {products.map((item) => {
          return <Slide key={item._id} product={item} />;
        })}
      </Slider>
    </div>
  );
};
export default Carousel;
