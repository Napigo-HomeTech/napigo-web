import { RootState } from "@/lib/Redux/store";
import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { PlanStatusSelect } from "../StatusSelect";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { fixtures } from "@/constant/datasets/fixtures";

/**
 *
 * @returns
 */
export const TopRightControl: React.FC = () => {
  const { isReady } = useSelector((state: RootState) => state.planformStore);
  const navigate = useNavigate();

  if (!isReady) {
    return null;
  }
  return (
    <HStack justifyContent="flex-end">
      <PlanStatusSelect />
      <Button
        colorScheme={"base"}
        leftIcon={<BackIcon />}
        onClick={() => navigate(-1)}
      >
        {fixtures.financeStrings["finance.planform.button.back"]}
      </Button>
    </HStack>
  );
};
