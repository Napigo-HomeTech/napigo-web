import { fixtures } from "@/constant/datasets/fixtures";
import { Form } from "@/elements";
import { Button, HStack, IconButton, VStack } from "@chakra-ui/react";
import {
  FaSearch as SearchIcon,
  FaList as TableViewIcon,
} from "react-icons/fa";
import { BsFillGridFill as GridViewIcon } from "react-icons/bs";

import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlan } from "@/lib/Finance/finance-service-apis";
import { PlanIdResponse } from "@/types/finance.type";
import { BasedResponse } from "@/lib/Apis";

export const PlanListingControls: React.FC = () => {
  const [viewType, setViewType] = useState<"table" | "grid">("grid");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  /**
   * This mutation function will be call on create button click, will do a post call
   * to get the new plan's generated ID (from backend) and navigate user to the
   * plan form screen with its plan's id
   */
  const onCreatePlan = useMutation({
    mutationFn: () => createPlan(),
    onSuccess: (response: BasedResponse<PlanIdResponse>) => {
      queryClient.invalidateQueries(["plans"]);
      navigate(response.data.plan_id, {
        state: {
          from_create_onclick: true,
        },
      });
    },
  });

  const getActiveViewButtonState = useCallback(
    (view: string) => {
      if (view === viewType) {
        return {
          borderColor: "brand.500",
          color: "brand.500",
        };
      }
      return {};
    },
    [viewType]
  );

  return (
    <VStack
      width={"100%"}
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <HStack gap={0} width="inherit" alignItems="flex-end">
        <Form.TextField
          autoComplete="off"
          containerWidth="auto"
          spellCheck={false}
          placeholder={
            fixtures.financeStrings[
              "finance.plan.gridview.control.search.placeholder"
            ]
          }
          bg="card"
        />{" "}
        <Button colorScheme="base" leftIcon={<SearchIcon />}>
          {
            fixtures.financeStrings[
              "finance.plan.gridview.control.search.button.text"
            ]
          }
        </Button>
        <Button colorScheme="base">In-use</Button>
        <Button colorScheme="secondary" onClick={() => onCreatePlan.mutate()}>
          {
            fixtures.financeStrings[
              "finance.plan.gridview.control.create-plan.button.text"
            ]
          }
        </Button>
      </HStack>
      <HStack>
        <IconButton
          onClick={() => setViewType("table")}
          colorScheme="base"
          aria-label="table-view"
          {...getActiveViewButtonState("table")}
        >
          <TableViewIcon />
        </IconButton>
        <IconButton
          onClick={() => setViewType("grid")}
          colorScheme="base"
          aria-label="grid-view"
          {...getActiveViewButtonState("grid")}
        >
          <GridViewIcon />
        </IconButton>
      </HStack>
    </VStack>
  );
};
