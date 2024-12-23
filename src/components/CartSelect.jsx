import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../features/cart/cartSlice';

const CartSelect = ({
  cartItemIndex,
  name,
  options,
  selectedSize,
  selectedColor,
}) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(selectedSize || selectedColor);

  const handleProductOptionChange = (e) => {
    const fieldChange =
      e.target.name === 'size' ? 'newSelectedSize' : 'newSelectedColor';
    dispatch(
      updateItem({
        [fieldChange]: e.target.value,
        cartItemIndex,
      })
    );
    setValue(e.target.value);
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
        value={value}
        onChange={handleProductOptionChange}
      >
        {options.map((option) => {
          if (name === 'size') {
            return <option key={option}>{option.toUpperCase()}</option>;
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
