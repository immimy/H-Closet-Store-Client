const SingleCartItemPanel = ({ title, data, element }) => {
  return (
    <div className='flex flex-col'>
      <h4 className='font-medium text-xs capitalize'>{title}</h4>
      {element ? element : <p className='font-normal tracking-wider'>{data}</p>}
    </div>
  );
};
export default SingleCartItemPanel;
