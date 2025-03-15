import { CartAmount, CartSelect, SingleCartItemPanel } from '../components';
import { formattedPrice, generateAmountOptions } from '../utilities';
import { useDispatch } from 'react-redux';
import { removeItem } from '../features/cart/cartSlice';

const SingleCartItem = ({
  cartItem,
  cartItemData,
  confirmOrder,
  showSubtotal,
  oneItemLeftInCart,
}) => {
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
    sellingPrice,
    isOnSale,
    discount,
  } = cartItem;
  const option = cartItemData?.option;
  const inventory = cartItemData?.inventory;

  const handleRemoveCartItem = (cartID) => {
    dispatch(removeItem({ cartID }));
  };

  return (
    <div>
      <div className='flex flex-col gap-y-3 md:flex-row md:justify-between md:gap-x-12 lg:gap-x-24 transition-all relative'>
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
        <div className='grid grid-flow-col auto-cols-[minmax(max-content,60px)] justify-end gap-x-2'>
          {/* SIZE */}
          {size && (
            <SingleCartItemPanel
              title='size'
              data={confirmOrder && size.toUpperCase()}
              element={
                !confirmOrder && (
                  <CartSelect
                    cartID={cartID}
                    name='size'
                    options={option}
                    inventory={inventory}
                    selectedSize={size.toLowerCase()}
                  />
                )
              }
            />
          )}
          {/* COLOR */}
          {color && (
            <SingleCartItemPanel
              title='color'
              element={
                confirmOrder ? (
                  <div
                    className={`w-10 h-6 shadow-inner]`}
                    style={{ backgroundColor: color }}
                  />
                ) : (
                  <CartSelect
                    cartID={cartID}
                    name='color'
                    options={option}
                    inventory={inventory}
                    selectedColor={color.toLowerCase()}
                  />
                )
              }
            />
          )}
          {/* PRICE */}
          <SingleCartItemPanel
            title='price'
            data={!isOnSale && formattedPrice(sellingPrice)}
            element={
              isOnSale && (
                <div className='pb-4 relative flex items-center gap-x-1'>
                  <p>{formattedPrice(sellingPrice)}</p>
                  <span className='badge badge-warning badge-xs font-medium'>
                    -{discount}%
                  </span>
                  <span className='line-through text-sm absolute top-1/2'>
                    {formattedPrice(price)}
                  </span>
                </div>
              )
            }
          />
          {/* AMOUNT */}
          <SingleCartItemPanel
            title='amount'
            data={confirmOrder && amount}
            element={
              !confirmOrder && (
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
              )
            }
          />
          {/* SUBTOTAL */}
          {showSubtotal && (
            <SingleCartItemPanel
              title='subtotal'
              data={formattedPrice(sellingPrice * amount)}
            />
          )}
          {/* REMOVE BUTTON */}
          {!confirmOrder && (
            <button
              type='button'
              className='uppercase text-xs font-medium tracking-widest text-error absolute top-2 right-2 md:static'
              onClick={() => handleRemoveCartItem(cartID)}
              disabled={oneItemLeftInCart}
            >
              remove
            </button>
          )}
        </div>
      </div>
      {!(numberInStock > 10) && !confirmOrder && (
        <span className='pt-2 uppercase italic flex justify-end tracking-widest text-sm font-medium'>
          {numberInStock} available items
        </span>
      )}
    </div>
  );
};
export default SingleCartItem;
