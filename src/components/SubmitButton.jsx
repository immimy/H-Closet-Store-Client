const SubmitButton = ({ text, color }) => {
  return (
    <button
      type='submit'
      className={`btn btn-block uppercase ${color ? color : 'btn-accent'}`}
    >
      {text}
    </button>
  );
};
export default SubmitButton;
