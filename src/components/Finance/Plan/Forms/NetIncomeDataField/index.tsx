import { Form } from "@/elements";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { RootState } from "@/lib/Redux/store";
import { useDispatch, useSelector } from "react-redux";

export const NetIncomeDatafield: React.FC = () => {
  const dispatch = useDispatch();

  const { net_income } = useSelector((state: RootState) => state.planformStore);

  return (
    <Form.CurrencyField
      label="Net income"
      bg="card"
      placeholder="0.00"
      defaultValue={net_income}
      onInputChange={(amount: string) => {
        dispatch(PlanformActions.updateIncome(amount));
      }}
    />
  );
};
