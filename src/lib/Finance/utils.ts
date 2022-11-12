/**
 * Format any number amount into string currency display
 * @param data
 * @returns
 */
const currencyFormat = (data: number) => {
  const sgdFormat = Intl.NumberFormat("en-sg");
  return "$" + sgdFormat.format(data);
};

export { currencyFormat };
