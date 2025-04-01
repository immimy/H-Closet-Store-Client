import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { setScrollY } from '../features/scroll/scrollSlice';

const Pagination = ({ offsetTopElementID }) => {
  const dispatch = useDispatch();
  const { meta } = useLoaderData();
  const currentPage = meta?.pagination.currentPage;
  const lastPage = meta?.pagination.totalPage;

  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (targetPage) => {
    const urlSearchParams = new URLSearchParams(search);
    urlSearchParams.set('page', targetPage);
    navigate(`${pathname}?${urlSearchParams.toString()}`);

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

  const createPageButton = (page, sepKey) => {
    return (
      <button
        key={`${page}-${sepKey}`}
        className={`join-item btn btn-sm md:btn-md ${
          currentPage === page && 'btn-active'
        } ${sepKey && 'btn-disabled'}`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    );
  };

  const createPageButtonArray = ({ currentPage, lastPage }) => {
    let buttonArray = [];

    lastPage !== 1 && buttonArray.push(createPageButton(1));
    if (currentPage > 2) {
      buttonArray.push(createPageButton('...', 'before'));
    }
    if (currentPage > 1 && currentPage < lastPage) {
      buttonArray.push(createPageButton(currentPage));
    }
    if (currentPage < lastPage - 1) {
      buttonArray.push(createPageButton('...', 'after'));
    }
    buttonArray.push(createPageButton(lastPage));

    return buttonArray;
  };

  return (
    <div className='mt-12 flex justify-center md:justify-end'>
      <div className='join'>
        <button
          className={`join-item btn btn-sm md:btn-md ${
            lastPage === 1 && 'btn-disabled'
          }`}
          onClick={() => {
            let prevPage = currentPage - 1;
            if (currentPage === 1) {
              prevPage = lastPage;
            }
            handlePageChange(prevPage);
          }}
        >
          <MdKeyboardDoubleArrowLeft />
        </button>
        {createPageButtonArray({ currentPage, lastPage })}
        <button
          className={`join-item btn btn-sm md:btn-md ${
            lastPage === 1 && 'btn-disabled'
          }`}
          onClick={() => {
            let nextPage = currentPage + 1;
            if (currentPage === lastPage) {
              nextPage = 1;
            }
            handlePageChange(nextPage);
          }}
        >
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
