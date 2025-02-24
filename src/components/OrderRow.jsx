import { Link } from 'react-router-dom';
import { formattedDateAndTime, formattedPrice } from '../utilities';
import { VscLinkExternal } from 'react-icons/vsc';
import { PiWarningThin } from 'react-icons/pi';

const OrderRow = ({ order }) => {
  const { createdAt, paymentMethod, status, total } = order;
  const { name } = order.shippingAddress;

  return (
    <>
      <th>{order._id.toUpperCase().slice(0, 10)}</th>
      <td>{formattedDateAndTime(createdAt)}</td>
      <td>{name}</td>
      <td className='capitalize'>{paymentMethod}</td>
      <td>{status}</td>
      <td>{formattedPrice(total)}</td>
      <td>
        <div className='tooltip' data-tip='See order details.'>
          <Link
            to={`/orders/${order._id}`}
            className='btn btn-sm btn-circle btn-ghost'
          >
            <VscLinkExternal />
          </Link>
        </div>
        {status === 'Pending' && (
          <div className='tooltip' data-tip='Continue paying.'>
            <Link
              to={`/checkout?order=${order._id}`}
              className='btn btn-sm btn-circle btn-ghost'
            >
              <PiWarningThin />
            </Link>
          </div>
        )}
      </td>
    </>
  );
};
export default OrderRow;
