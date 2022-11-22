import currency from "currency.js";

/**
 *
 * @param income
 * @param esm_percent
 */
const calculateESMAmount = (income: string, esm_percent: number): string => {
  const incomeVal = currency(income).value;
  const result = currency((incomeVal / 100) * esm_percent).format({
    precision: 2,
  });
  return result;
};

export { calculateESMAmount };
