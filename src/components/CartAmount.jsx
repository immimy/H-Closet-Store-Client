import { useState } from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { updateItem } from '../features/cart/cartSlice';

const CartAmount = ({ cartItemIndex, stockNumber, amount }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(Number(amount));

  const handleAmountChange = (newAmount) => {
    setValue(newAmount);
    dispatch(updateItem({ cartItemIndex, newAmount }));
  };

  return (
    <div className='flex items-center gap-x-2'>
      <button
        type='button'
        disabled={value === 1}
        onClick={() => {
          const decreaseAmount = value - 1;
          return handleAmountChange(decreaseAmount);
        }}
      >
        <CiSquareMinus className='text-xl' />
      </button>
      <span>{value}</span>
      <button
        type='button'
        disabled={value === stockNumber}
        onClick={() => {
          const increaseAmount = value + 1;
          return handleAmountChange(increaseAmount);
        }}
      >
        <CiSquarePlus className='text-xl' />
      </button>
    </div>
  );
};
export default CartAmount;
