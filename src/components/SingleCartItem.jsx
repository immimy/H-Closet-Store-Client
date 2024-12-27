import { CartAmount, CartSelect, SingleCartItemPanel } from '../components';
import { formattedPrice, generateAmountOptions } from '../utilities';
import { useDispatch } from 'react-redux';
import { removeItem } from '../features/cart/cartSlice';

const SingleCartItem = ({ cartItem, cartItemData }) => {
  const dispatch = useDispatch();

  const {
    cartID,
    name,
    category,
    image,
    size,
    color,
    price,
    amount,
    numberInStock,
  } = cartItem;
  const { option, inventory } = cartItemData;

  const handleRemoveCartItem = (cartID) => {
    dispatch(removeItem({ cartID }));
  };

  return (
    <div>
      <div className='flex flex-col flex-wrap md:flex-row md:justify-between md:gap-x-32 lg:gap-x-64 transition-all relative'>
        {/* HEAD */}
        <div className='flex gap-x-2 sm:gap-x-6 items-center text-left'>
          <img
            src={image}
            alt='name'
            className='size-12 object-cover rounded-md shadow-sm'
          />
          <div className='text-xs sm:text-sm tracking-wider'>
            <h4 className='font-medium'>{name}</h4>
            <h6 className='pt-1 font-normal capitalize'>{category}</h6>
          </div>
        </div>
        {/* TAIL */}
        <div className='flex flex-wrap justify-end items-center gap-x-4'>
          {size && (
            <SingleCartItemPanel
              title='size'
              element={
                <CartSelect
                  cartID={cartID}
                  name='size'
                  options={option}
                  inventory={inventory}
                  selectedSize={size.toLowerCase()}
                />
              }
            />
          )}
          {color && (
            <SingleCartItemPanel
              title='color'
              element={
                <CartSelect
                  cartID={cartID}
                  name='color'
                  options={option}
                  inventory={inventory}
                  selectedColor={color.toLowerCase()}
                />
              }
            />
          )}
          <SingleCartItemPanel title='price' data={formattedPrice(price)} />
          <SingleCartItemPanel
            title='amount'
            element={
              <CartAmount
                cartID={cartID}
                name='amount'
                options={
                  numberInStock > 10
                    ? generateAmountOptions(10)
                    : generateAmountOptions(numberInStock)
                }
                amount={Number(amount)}
              />
            }
          />
          {/* REMOVE BUTTON */}
          <button
            type='button'
            className='uppercase text-xs font-medium tracking-widest text-error absolute top-2 right-2 md:static'
            onClick={() => handleRemoveCartItem(cartID)}
          >
            remove
          </button>
        </div>
      </div>
      {!(numberInStock > 10) && (
        <span className='pt-2 uppercase italic flex justify-end tracking-widest text-sm font-medium'>
          {numberInStock} available items
        </span>
      )}
    </div>
  );
};
export default SingleCartItem;
