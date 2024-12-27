// Delete product options that have no quantity in stock.
export const deleteUnavailableOption = ({ targetArr, conditionArr }) => {
  const result = targetArr?.filter((_, index) => conditionArr[index] > 0);
  return result;
};
export const getAvailableProducts = ({ option, inventory }) => {
  const availableOption = deleteUnavailableOption({
    targetArr: option,
    conditionArr: inventory,
  });
  const availableInventory = deleteUnavailableOption({
    targetArr: inventory,
    conditionArr: inventory,
  });
  return { availableOption, availableInventory };
};

export const getNumberInStockOfSelectedOption = ({
  selectedOption,
  optionArr,
  inventoryArr,
}) => {
  const index =
    optionArr?.findIndex((item) => selectedOption?.toLowerCase() === item) || 0;
  return inventoryArr[index];
};
