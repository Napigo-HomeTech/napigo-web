import React, { Fragment, useCallback, useMemo } from "react";
import { Badge, Card } from "@/elements";
import moment from "moment";
import { PlanStatus, PlanSummary } from "@/types/finance.type";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaReceipt as PlanIcon,
  FaArrowRight as UsedInIcon,
} from "react-icons/fa";
import { DataRow } from "@/elements/DataDisplay/DataRow";
import { useNavigate } from "react-router-dom";
import { fixtures } from "@/constant/datasets/fixtures";
import currency from "currency.js";
import { isEmpty } from "lodash";
import { PlanCardMenu } from "./PlanCardMenu";

/**
 *
 * @param props
 * @returns
 */
export const PlanGridCard: React.FC<PlanSummary> = (props) => {
  const asmHealthStatus = useMemo(() => {
    switch (props.health_status) {
      case "HEALTHY":
        return "success";
      case "WARNING":
        return "warning";
      case "DANGER":
        return "danger";
      case "NONE":
        return "no status";
      default:
        return "no status";
    }
  }, [props.health_status]);

  const isInUsed = Boolean(props.status === PlanStatus.in_used);
  const navigate = useNavigate();

  const transformAsmData = useMemo(() => {
    const curr = currency(props.asm_amount, { precision: 2 }).format();
    const percent = `(${props.asm_percent}%)`;
    return `${curr} ${percent}`;
  }, [props.asm_amount, props.asm_percent]);

  const onItemClick = useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      navigate(`${props._id}`);
    },
    [navigate, props._id]
  );

  return (
    <Fragment>
      <Card
        onClick={onItemClick}
        width="100%"
        _hover={{
          borderColor: "brand.400",
          cursor: "pointer",
        }}
        borderColor={isInUsed ? "brand.500" : "border"}
        borderWidth={1}
        p="10px"
        rounded="md"
        gap={2}
      >
        <HStack
          width={"100%"}
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="border"
          paddingBottom="5px"
        >
          <HStack>
            <Box color={"brand.500"}>
              <PlanIcon color="inherit" />
            </Box>
            <Heading size={"sm"}>{props.title}</Heading>
          </HStack>
          <HStack>
            {isInUsed && (
              <Box bg="brand.50" px="20px" rounded="md" color="brand.500">
                <Text>In-use</Text>
              </Box>
            )}

            <PlanCardMenu id={props._id} title={props.title} />
          </HStack>
        </HStack>
        <VStack>
          <DataRow
            label="Income"
            data={currency(props.net_income, { precision: 2 }).format()}
          />
          <DataRow
            label="COL"
            data={currency(props.col, { precision: 2 }).format()}
          />
          <DataRow label="ASM" data={transformAsmData} />
          <DataRow
            label={
              isEmpty(props.updated_at)
                ? fixtures.financeStrings[
                    "finance.plan.gridview.card.created_at"
                  ]
                : fixtures.financeStrings[
                    "finance.plan.gridview.card.updated_at"
                  ]
            }
            data={
              isEmpty(props.updated_at)
                ? moment(props.created_at).calendar().toString()
                : moment(props.updated_at).calendar().toString()
            }
          />
          <Divider />
          <HStack width={"100%"} justifyContent="space-between">
            <Button size="xs" colorScheme={"gray"}>
              Used in <UsedInIcon />
            </Button>
            {asmHealthStatus && asmHealthStatus !== null && (
              <Badge
                color={asmHealthStatus as string}
                status={props.health_status!.toLowerCase()}
              />
            )}
          </HStack>
        </VStack>
      </Card>
    </Fragment>
  );
};
