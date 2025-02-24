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
