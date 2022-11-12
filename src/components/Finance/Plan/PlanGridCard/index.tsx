import React, { useCallback, useMemo } from "react";
import { Badge, Card } from "@/elements";
import { PlanSummary } from "@/types/finance.type";
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
  FaEllipsisV as MenuIcon,
  FaArrowRight as UsedInIcon,
} from "react-icons/fa";
import { DataRow } from "@/elements/DataDisplay/DataRow";
import { currencyFormat } from "@/lib/Finance/utils";

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
      default:
        null;
    }
  }, [props.health_status]);

  const isInUsed = Boolean(props.in_use);

  const transformAsmData = useMemo(() => {
    const curr = currencyFormat(props.asm_amount);
    const percent = `(${props.asm_percent}%)`;
    return `${curr} ${percent}`;
  }, [props.asm_amount, props.asm_percent]);

  const onItemClick = useCallback(() => {
    // TODO
  }, []);

  return (
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
          {props.in_use && (
            <Box bg="brand.50" px="20px" rounded="md" color="brand.500">
              <Text>In-use</Text>
            </Box>
          )}
          <Button
            size="sm"
            colorScheme="gray"
            variant={"ghost"}
            px="3px"
            rounded="full"
          >
            <MenuIcon />
          </Button>
        </HStack>
      </HStack>
      <VStack>
        <DataRow label="Income" data={currencyFormat(props.net_income)} />
        <DataRow label="COL" data={currencyFormat(props.col)} />
        <DataRow label="ASM" data={transformAsmData} />
        <DataRow label="Created at" data="2 days ago" />
        <Divider />
        <HStack width={"100%"} justifyContent="space-between">
          <Button size="xs" colorScheme={"gray"}>
            Used in <UsedInIcon />
          </Button>
          {asmHealthStatus && asmHealthStatus !== null && (
            <Badge
              color={asmHealthStatus as string}
              status={asmHealthStatus!.toLowerCase()}
            />
          )}
        </HStack>
      </VStack>
    </Card>
  );
};
