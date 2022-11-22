import { RootState } from "@/lib/Redux/store";
import { VStack, Heading } from "@chakra-ui/react";
import currency from "currency.js";
import { useSelector } from "react-redux";

export const ASMAmountDatafield: React.FC = () => {
  const { asm_amount } = useSelector((state: RootState) => state.planformStore);
  return (
    <VStack alignItems="center" justifyContent="center" height="100%" gap={3}>
      <Heading color="text-soft" size={"xs"} fontWeight="bold">
        ASM $
      </Heading>
      <Heading color="text-hard" size="sm">
        {currency(asm_amount as string, { precision: 2 }).format()}
      </Heading>
    </VStack>
  );
};
