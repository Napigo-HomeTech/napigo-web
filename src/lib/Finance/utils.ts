import { PlanItem } from "@/types/finance.type";
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
    symbol: "",
  });
  return result;
};

const calculateCOL = (items: PlanItem[]) => {
  let sum = "0.00";
  items.forEach((item: PlanItem) => {
    sum = currency(sum).add(item.amount).format();
  });
  return currency(sum).format({ precision: 2, symbol: "" });
};

const calculateASM = (net_income: string, col: string) => {
  return currency(net_income)
    .subtract(col)
    .format({ precision: 2, symbol: "" });
};

const calculateASMPercent = (esm: string, asm: string): number => {
  return currency(asm).divide(esm).multiply(100).value;
};
export { calculateESMAmount, calculateCOL, calculateASM, calculateASMPercent };
