import { useDispatch } from 'react-redux';
import { setScrollY } from '../features/scroll/scrollSlice';

const Tags = ({ name, allTags, selectedTag, offsetTopElementID }) => {
  const dispatch = useDispatch();
  const handleTagClicked = (e) => {
    const previousTagInput = document.getElementById(selectedTag);
    previousTagInput.setAttribute('disabled', true);

    const currentTagInput = e.currentTarget.querySelector('input');
    currentTagInput.removeAttribute('disabled');

    // Keep scroll Y position
    if (offsetTopElementID) {
      dispatch(
        setScrollY({
          scrollYPosition:
            document.getElementById(offsetTopElementID).offsetTop,
        })
      );
    }
  };

  return (
    <>
      {allTags.map((tag) => {
        return (
          <button
            key={tag}
            type='submit'
            className='badge badge-lg rounded-none badge-warning p-2 sm:p-4 md:p-6 capitalize'
            onClick={handleTagClicked}
          >
            {tag}
            <input
              id={tag}
              type='hidden'
              name={name}
              value={tag}
              disabled={selectedTag !== tag}
            />
          </button>
        );
      })}
    </>
  );
};
export default Tags;
