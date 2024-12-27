import { getNumberInStockOfSelectedOption } from '../utilities';
import { useDispatch } from 'react-redux';
import { updateItem } from '../features/cart/cartSlice';

const CartSelect = ({
  cartID,
  name,
  options,
  inventory,
  selectedSize,
  selectedColor,
}) => {
  const dispatch = useDispatch();

  const handleProductOptionChange = (e) => {
    const newSelectedOption = e.target.value.toLowerCase();
    const newNumberInStock = getNumberInStockOfSelectedOption({
      selectedOption: newSelectedOption,
      optionArr: options,
      inventoryArr: inventory,
    });
    dispatch(
      updateItem({
        cartID,
        newSelectedOption,
        newNumberInStock,
      })
    );
  };

  return (
    <div className='form-control w-full'>
      <select
        name={name}
        className='select select-xs select-bordered rounded-none text-black'
        style={
          selectedColor && {
            backgroundColor: selectedColor,
            color: selectedColor,
          }
        }
        value={selectedSize || selectedColor}
        onChange={handleProductOptionChange}
      >
        {options.map((option) => {
          if (name === 'size') {
            return (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            );
          }
          if (name === 'color') {
            return (
              <option
                key={option}
                style={{ backgroundColor: option, color: option }}
                value={option}
              />
            );
          }
        })}
      </select>
    </div>
  );
};
export default CartSelect;
