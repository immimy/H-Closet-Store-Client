import { useNavigation } from 'react-router-dom';

const SubmitButton = ({ text, color, tracking }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button
      type='submit'
      className={`btn btn-block uppercase ${
        color ? color : 'btn-accent'
      } ${tracking}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'submitting...' : text}
    </button>
  );
};
export default SubmitButton;
