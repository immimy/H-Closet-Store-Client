export const generateAmountOptions = (amountNumber) => {
  return Array.from({ length: amountNumber }, (_, index) => {
    return index + 1;
  });
};
