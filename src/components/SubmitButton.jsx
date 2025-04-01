const SubmitButton = ({ text, color, tracking }) => {
  return (
    <button
      type='submit'
      className={`btn btn-block uppercase ${
        color ? color : 'btn-accent'
      } ${tracking}`}
    >
      {text}
    </button>
  );
};
export default SubmitButton;
