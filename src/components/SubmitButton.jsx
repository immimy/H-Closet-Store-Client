const SubmitButton = ({ text, color }) => {
  return (
    <button
      className={`btn btn-block uppercase ${color ? color : 'btn-accent'}`}
    >
      {text}
    </button>
  );
};
export default SubmitButton;
