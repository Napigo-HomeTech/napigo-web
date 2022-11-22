import { Form } from "@/elements";
import { calculateESMAmount } from "@/lib/Finance/utils";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { RootState } from "@/lib/Redux/store";
import { useDispatch, useSelector } from "react-redux";

export const NetIncomeDatafield: React.FC = () => {
  const dispatch = useDispatch();

  const { net_income, esm_percent } = useSelector(
    (state: RootState) => state.planformStore
  );

  return (
    <Form.CurrencyField
      label="Net income"
      bg="card"
      placeholder="0.00"
      defaultValue={net_income}
      onInputChange={(amount: string) => {
        dispatch(PlanformActions.updateIncome(amount));
        /**
         * Update the ESM Amount too
         */
        const esmValue = calculateESMAmount(
          amount as string,
          esm_percent as number
        );
        dispatch(PlanformActions.updateESMAmount(esmValue));
      }}
    />
  );
};
