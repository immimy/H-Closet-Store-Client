const Title = ({ text, textColor, hrColor, tracking }) => {
  return (
    <>
      <h1
        className={`uppercase text-2xl font-bold pb-2 ${
          textColor || 'text-primary-content'
        } ${tracking}`}
      >
        {text}
      </h1>
      <hr className={`${hrColor}`} />
    </>
  );
};
export default Title;
