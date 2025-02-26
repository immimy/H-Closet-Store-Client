const OrderAlert = ({ value, icon, element, alertColor, countdownTime }) => {
  return (
    <div
      role='alert'
      className={`mt-8 sm:px-16 alert ${alertColor} flex flex-wrap justify-center sm:justify-between text-lg font-medium tracking-wider`}
    >
      <div className='flex items-center gap-x-2'>
        <div className='text-xl'>{icon}</div>
        <span>{value} Order</span>
      </div>
      <div className='flex items-center gap-x-2'>
        {/* COUNTDOWN CLOCK */}
        {countdownTime && (
          <span className='countdown font-mono text-xl'>
            <span style={{ '--value': countdownTime.hour }} />:
            <span style={{ '--value': countdownTime.minute }} />:
            <span style={{ '--value': countdownTime.second }} />
          </span>
        )}
        {/* CHECKOUT BUTTON */}
        {element}
      </div>
    </div>
  );
};
export default OrderAlert;
