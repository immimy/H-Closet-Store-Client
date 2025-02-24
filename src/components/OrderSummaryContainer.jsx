import { OrderSummaryList, Title } from '../components';
import { formattedPrice } from '../utilities';
import { ImGift } from 'react-icons/im';

const OrderSummaryContainer = ({
  name,
  address,
  cartTotal,
  shippingFee,
  orderTotal,
  giftService,
  paymentMethod,
  mdFlexDirection,
}) => {
  return (
    <div
      className={`mt-4 p-8 bg-base-300 text-base-content flex flex-col gap-y-4 gap-x-6 ${mdFlexDirection}`}
    >
      {/* SHIPPING ADDRESS */}
      <div className='w-full'>
        <Title
          text='shipping address'
          textColor='text-base-content'
          hrColor='border-base-content'
        />
        <div className='p-4'>
          <p>
            {name}
            <br />
            {address}
          </p>
        </div>
      </div>
      {/* ORDER SUMMARY */}
      <div className='w-full'>
        <Title
          text='order summary'
          textColor='text-base-content'
          hrColor='border-base-content'
        />
        {/* SUBTOTAL & SHIPPING FEE & TOTAL */}
        <div className='p-4'>
          {paymentMethod && (
            <OrderSummaryList title='payment method' value={paymentMethod} />
          )}
          <OrderSummaryList
            title='subtotal'
            value={formattedPrice(cartTotal)}
          />
          <OrderSummaryList
            title='shipping fee'
            value={formattedPrice(shippingFee)}
          />
          <OrderSummaryList title='total' value={formattedPrice(orderTotal)} />
          {/* GIFT SERVICE */}
          <div className='mt-6 flex justify-center'>
            <label className='flex gap-x-4'>
              <input
                type='checkbox'
                className='checkbox checkbox-secondary'
                disabled
                checked={giftService}
              />
              <span className='label-text text-base-content flex items-center capitalize gap-x-1.5'>
                <ImGift /> gift wrapping service
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummaryContainer;
