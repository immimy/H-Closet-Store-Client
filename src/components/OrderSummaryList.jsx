const OrderSummaryList = ({ title, value, text }) => {
  return (
    <div className='grid mt-3 first:mt-0 text-lg'>
      <div className='flex justify-between flex-wrap capitalize'>
        <p>{title}</p>
        <span>{value}</span>
      </div>
      {text && (
        <span className='pt-1.5 text-sm justify-self-end text-end text-error font-medium'>
          {text}
        </span>
      )}
    </div>
  );
};
export default OrderSummaryList;
