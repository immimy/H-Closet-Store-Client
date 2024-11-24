import hero from '../assets/hero.jpg';
import { CircleBadge } from '../components';
// icons
import { MdOutlineLocalShipping } from 'react-icons/md';
import { BsCashCoin } from 'react-icons/bs';
import { GrGift } from 'react-icons/gr';

const Hero = () => {
  return (
    <>
      <img
        src={hero}
        alt='hero-image'
        className='object-cover shadow-xl rounded-full rounded-tl-none min-w-48 md:max-w-2xl lg:rounded-tl-full lg:rounded-tr-none'
      />
      <div className='mt-4 text-center lg:text-right text-primary-content'>
        <h1 className='text-6xl font-bold leading-snug tracking-wider '>
          Welcome to
          <br />
          <span className='skew-y-6 text-5xl text-secondary-content inline-block relative before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-secondary'>
            <span className='px-8 relative'>H.Closet!</span>
          </span>
        </h1>
        <p className='leading-loose tracking-wider p-6'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
          reprehenderit fugiat, nesciunt, excepturi est placeat amet minima,
          consequuntur corporis eos blanditiis incidunt recusandae cumque quis
          iste veritatis odit iure beatae.
        </p>
        <div className='flex justify-center gap-x-6'>
          <CircleBadge
            icon={<MdOutlineLocalShipping />}
            topic='free shipping'
          />
          <CircleBadge icon={<BsCashCoin />} topic='cash on delivery' />
          <CircleBadge icon={<GrGift />} topic='gift service' />
        </div>
      </div>
    </>
  );
};
export default Hero;
