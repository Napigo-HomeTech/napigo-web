import { usePrompt } from "@/elements/Prompt";
import { RootState } from "@/lib/Redux/store";
import { Button, HStack, VStack } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { PlanFormLoader } from "./PlanFormLoader";
import { PlanFormUpdater } from "./PlanFormUpdater";
import { PlanTitle } from "./PlanTitle";
import { SavingIndicator } from "./SavingIndicator";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { PlanStatusSelect } from "./StatusSelect";
import { fixtures } from "@/constant/datasets/fixtures";
import { useNavigate } from "react-router-dom";
import { MainSection } from "./MainSection";

export const PlanForm: React.FC = () => {
  const navigate = useNavigate();

  const { count, onSaving } = useSelector((state: RootState) => ({
    count: state.plan_eventCountStore.count,
    onSaving: state.plan_onSavingStore.onSaving,
  }));

  usePrompt({
    header: "Are you sure you want to leave ?",
    message: "Changes that you made may not be saved",
    when: count > 0 || onSaving,
  });

  return (
    <Fragment>
      <PlanFormLoader />
      <PlanFormUpdater />
      <VStack width={"inherit"} gap={2}>
        <HStack
          width={"inherit"}
          gap={0}
          justifyContent={"space-between"}
          maxHeight={"70px"}
        >
          <HStack>
            <PlanTitle />
            <SavingIndicator />
          </HStack>
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
        </HStack>
        <MainSection />
      </VStack>
    </Fragment>
  );
};
