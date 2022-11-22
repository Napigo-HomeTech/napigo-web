import React, { Fragment, useCallback, useMemo } from "react";
import { Badge, Card } from "@/elements";
import moment from "moment";
import { PlanStatus, PlanSummary } from "@/types/finance.type";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  FaReceipt as PlanIcon,
  FaEllipsisV as MenuIcon,
  FaArrowRight as UsedInIcon,
} from "react-icons/fa";
import { DataRow } from "@/elements/DataDisplay/DataRow";
import { useNavigate } from "react-router-dom";
import { fixtures } from "@/constant/datasets/fixtures";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlan } from "@/lib/Finance/finance-service-apis";
import currency from "currency.js";
import { isEmpty } from "lodash";

/**
 *
 * @param props
 * @returns
 */
export const PlanGridCard: React.FC<PlanSummary> = (props) => {
  const queryClient = useQueryClient();

  const onDeletePlan = useMutation({
    mutationFn: (plan_id: string) => deletePlan(plan_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["plans"]);
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

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
  const onDelete = useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      onOpen();
    },
    [onOpen]
  );

  const onConfirmDelete = useCallback(() => {
    onDeletePlan.mutate(props._id);
    onClose();
  }, [onClose, onDeletePlan, props._id]);

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

            <Menu>
              <MenuButton
                as={IconButton}
                size="sm"
                colorScheme="gray"
                variant={"ghost"}
                icon={<MenuIcon />}
                onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
              />

              <MenuList>
                <MenuItem onClick={onDelete}>Delete</MenuItem>
              </MenuList>
            </Menu>
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
                status={asmHealthStatus!.toLowerCase()}
              />
            )}
          </HStack>
        </VStack>
      </Card>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            {fixtures.financeStrings["finance.plan.delete-dialog.title"]}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {fixtures.financeStrings["finance.plan.delete-dialog.message"]}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {
                fixtures.financeStrings[
                  "finance.plan.delete-dialog.button.cancel"
                ]
              }
            </Button>
            <Button colorScheme="red" ml={3} onClick={onConfirmDelete}>
              {
                fixtures.financeStrings[
                  "finance.plan.delete-dialog.button.delete"
                ]
              }
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
};