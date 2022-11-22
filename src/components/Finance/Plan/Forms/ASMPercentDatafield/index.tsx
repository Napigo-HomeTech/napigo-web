import { RootState } from "@/lib/Redux/store";
import { VStack, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const ASMPercentDatafield: React.FC = () => {
  const { asm_percent } = useSelector(
    (state: RootState) => state.planformStore
  );
  return (
    <VStack alignItems="center" justifyContent="center" height="100%" gap={3}>
      <Heading color="text-soft" size={"xs"} fontWeight="bold">
        ASM %
      </Heading>
      <Heading color="text-hard" size="sm">
        {asm_percent} %
      </Heading>
    </VStack>
  );
};
