const Title = ({ text, textColor, hrColor }) => {
  return (
    <>
      <h1
        className={`uppercase text-2xl font-bold pb-2 ${
          textColor || 'text-primary-content'
        }`}
      >
        {text}
      </h1>
      <hr className={`${hrColor}`} />
    </>
  );
};
export default Title;
