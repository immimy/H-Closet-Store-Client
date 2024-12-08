import { Card } from '../components';

const GridDisplay = ({ items }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-2'>
      {items.map((item) => {
        return <Card key={item._id} item={item} />;
      })}
    </div>
  );
};
export default GridDisplay;
