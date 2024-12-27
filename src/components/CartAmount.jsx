import { useDispatch } from 'react-redux';
import { updateItem } from '../features/cart/cartSlice';

const CartAmount = ({ cartID, name, options, amount }) => {
  const dispatch = useDispatch();

  const handleAmountChange = (e) => {
    const newAmount = Number(e.target.value);
    dispatch(updateItem({ cartID, newAmount }));
  };

  return (
    <div className='form-control w-full'>
      <select
        name={name}
        className='select select-xs select-bordered rounded-none text-black'
        value={amount}
        onChange={handleAmountChange}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default CartAmount;
