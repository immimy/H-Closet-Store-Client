import { CartAmount, CartSelect, SingleCartItemPanel } from '../components';
import { formattedPrice } from '../utilities/formatting';
import { ImCross } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { removeItem } from '../features/cart/cartSlice';

const SingleCartItem = ({ cart, cartItemsData }) => {
  const dispatch = useDispatch();

  const handleRemoveCartItem = (cartItemIndex) => {
    dispatch(removeItem({ cartItemIndex }));
  };

  return (
    <>
      {cart.map((item, index) => {
        const { name, category, image, size, color, price, amount } = item;
        const { option, inventory } = cartItemsData[index];
        const inventoryIndex = option?.findIndex((item) =>
          new RegExp(size || color, 'i').test(item)
        );
        const stockNumber = inventory[inventoryIndex || 0];

        return (
          <li
            key={`${item.id}_${index}`}
            className='min-w-max w-screen max-w-md md:max-w-lg flex flex-wrap flex-col md:flex-row md:justify-between gap-y-1 pt-2 pb-2 first:pt-0 last:pb-0 transition-all relative'
          >
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
            <div className='flex flex-wrap justify-end items-center gap-x-4 tracking-wide leading-6'>
              {size && (
                <SingleCartItemPanel
                  title='size'
                  element={
                    <CartSelect
                      cartItemIndex={index}
                      name='size'
                      options={option}
                      selectedSize={size}
                    />
                  }
                />
              )}
              {color && (
                <SingleCartItemPanel
                  title='color'
                  element={
                    <CartSelect
                      cartItemIndex={index}
                      name='color'
                      options={option}
                      selectedColor={color}
                    />
                  }
                />
              )}
              <SingleCartItemPanel title='price' data={formattedPrice(price)} />
              <SingleCartItemPanel
                title='amount'
                element={
                  <CartAmount
                    cartItemIndex={index}
                    stockNumber={stockNumber}
                    amount={amount}
                  />
                }
              />
              <SingleCartItemPanel
                title='subtotal'
                data={formattedPrice(amount * price)}
              />
              <button
                type='button'
                className='text-error absolute top-2 right-2 md:static'
                onClick={() => handleRemoveCartItem(index)}
              >
                <ImCross />
              </button>
            </div>
          </li>
        );
      })}
    </>
  );
};
export default SingleCartItem;
