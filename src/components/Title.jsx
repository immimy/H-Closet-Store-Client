const Title = ({ text }) => {
  return (
    <>
      <h1 className='uppercase text-2xl font-bold pb-2 text-primary-content'>
        {text}
      </h1>
      <hr />
    </>
  );
};
export default Title;
