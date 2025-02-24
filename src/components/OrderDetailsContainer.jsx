import { SingleCartItem, Title } from '../components';

const OrderDetailsContainer = ({ cartItems, continueOrder }) => {
  return (
    <div>
      <div className='pb-4 flex justify-between items-center'>
        <Title text='order details' />
        <span className='text-lg font-medium'>{cartItems.length} Items</span>
      </div>
      <hr className='text-base-100' />
      <div>
        <ul className='px-4 py-2'>
          {cartItems.map((item) => {
            // Continued checkout, need to attach cartID prop.
            let newItem;
            if (continueOrder) {
              newItem = { ...item, cartID: item._id };
            }

            return (
              <li
                key={`${newItem?.cartID || item.cartID}`}
                className='pt-4 pb-4'
              >
                <SingleCartItem
                  cartItem={newItem || item}
                  confirmOrder={true}
                  showSubtotal={true}
                />
              </li>
            );
          })}
        </ul>
        <hr className='text-base-100' />
      </div>
    </div>
  );
};
export default OrderDetailsContainer;
