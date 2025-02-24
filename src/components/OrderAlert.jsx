const OrderAlert = ({ value, icon, element, alertColor }) => {
  return (
    <div
      role='alert'
      className={`mt-8 sm:px-16 alert ${alertColor} flex flex-wrap justify-center sm:justify-between text-lg font-medium tracking-wider`}
    >
      <div className='flex items-center gap-x-2'>
        <div className='text-xl'>{icon}</div>
        <span>{value} Order</span>
      </div>
      {element}
    </div>
  );
};
export default OrderAlert;
