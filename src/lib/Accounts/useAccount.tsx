import { RootState } from "@/lib/Redux/store";
import { useSelector } from "react-redux";

/**
 *
 * @returns
 */
export const useAccount = () => {
  const { account } = useSelector((state: RootState) => state.accountStore);
  return account;
};
