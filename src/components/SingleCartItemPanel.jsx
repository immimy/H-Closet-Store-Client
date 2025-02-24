const SingleCartItemPanel = ({ title, data, element }) => {
  return (
    <div className='flex flex-col text-center gap-y-1 max-w-max justify-self-center'>
      <h4 className='font-medium text-xs capitalize tracking-wide'>{title}</h4>
      {element ? element : <p className='font-normal tracking-wider'>{data}</p>}
    </div>
  );
};
export default SingleCartItemPanel;
