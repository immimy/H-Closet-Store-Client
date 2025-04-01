import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

export const formattedPrice = (input) => {
  const thaiBaht = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  });
  return thaiBaht.format(Number(input));
};

export const formattedDateAndTime = (input) => {
  return day(input).format('D MMM YYYY, hh:mm A');
};

export const displayActualDateWithinMonth = (input) => {
  const now = Date.now();
  const inputDate = new Date(input).getTime();
  const diff = now - inputDate;

  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  const oneYear = 1000 * 60 * 60 * 24 * 365;

  if (diff > oneYear) {
    return `${Math.floor(diff / oneYear)}y ago`;
  }
  if (diff > oneMonth) {
    return `${Math.floor(diff / oneMonth)}mo ago`;
  }

  // Within one month, show full date.
  return day(input).format('D MMM YYYY');
};
