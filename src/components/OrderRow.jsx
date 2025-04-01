import { Link } from 'react-router-dom';
import { formattedDateAndTime, formattedPrice } from '../utilities';
import { VscLinkExternal } from 'react-icons/vsc';
import { PiWarningThin } from 'react-icons/pi';
import { BsPencilSquare } from 'react-icons/bs';

const OrderRow = ({ order }) => {
  const { createdAt, paymentMethod, status, total, reviewCount, updatedAt } =
    order;
  const { name } = order.shippingAddress;

  // Can only submit reviews when already paid an order and within 2 weeks.
  const reviewStatuses = ['Ordered', 'Packed', 'In Transit', 'Delivered'];
  const isExceedTwoWeeks =
    Date.now() > new Date(updatedAt).getTime() + 1000 * 60 * 60 * 24 * 7 * 2;

  return (
    <>
      <th>{order._id.toUpperCase().slice(0, 10)}</th>
      <td>{formattedDateAndTime(createdAt)}</td>
      <td>{name}</td>
      <td className='capitalize'>{paymentMethod}</td>
      <td>{status}</td>
      <td>{formattedPrice(total)}</td>
      <td>
        {/* See order details */}
        <div className='tooltip' data-tip='See order details'>
          <Link
            to={`/orders/${order._id}`}
            className='btn btn-sm btn-circle btn-ghost'
          >
            <VscLinkExternal />
          </Link>
        </div>
        {/* Continue checking out */}
        {status === 'Pending' && (
          <div className='tooltip' data-tip='Continue paying'>
            <Link
              to={`/checkout?order=${order._id}`}
              className='btn btn-sm btn-circle btn-ghost'
            >
              <PiWarningThin />
            </Link>
          </div>
        )}
        {/* Make reviews */}
        {reviewStatuses.includes(status) &&
          !isExceedTwoWeeks &&
          reviewCount < 1 && (
            <div className='tooltip' data-tip='Make reviews'>
              <Link
                to={`/reviews/${order._id}`}
                className='btn btn-sm btn-circle btn-ghost'
              >
                <BsPencilSquare />
              </Link>
            </div>
          )}
      </td>
    </>
  );
};
export default OrderRow;
