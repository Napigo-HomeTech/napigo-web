import { fixtures } from "@/constant/datasets/fixtures";
import { deletePlan } from "@/lib/Finance/finance-service-apis";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { FaEllipsisV as MenuIcon } from "react-icons/fa";

type PlanCardMenuProps = {
  id: string;
  title: string;
};
export const PlanCardMenu: React.FC<PlanCardMenuProps> = ({ id, title }) => {
  const {
    isOpen: delIsOpen,
    onOpen: delOnOpen,
    onClose: delOnClose,
  } = useDisclosure();

  const queryClient = useQueryClient();

  /**
   *
   */
  const onDeletePlan = useMutation({
    mutationFn: (plan_id: string) => deletePlan(plan_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["plans"]);
    },
  });

  const cancelRef = React.useRef<HTMLButtonElement>(null);

  /**
   *
   */
  const onDelete = useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      delOnOpen();
    },
    [delOnOpen]
  );

  /**
   *
   */
  const onConfirmDelete = useCallback(() => {
    onDeletePlan.mutate(id);
    delOnClose();
  }, [delOnClose, onDeletePlan, id]);

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          size="sm"
          colorScheme="gray"
          variant="ghost"
          onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
          icon={<MenuIcon />}
        />
        <MenuList>
          <MenuItem onClick={onDelete}>
            {fixtures.financeStrings["finance.plan.gridview.card.menu.delete"]}
          </MenuItem>
          <MenuItem>
            {fixtures.financeStrings["finance.plan.gridview.card.menu.copy"]}
          </MenuItem>
        </MenuList>
      </Menu>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={delOnClose}
        isOpen={delIsOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader color="text-hard">
            {fixtures.financeStrings["finance.plan.delete-dialog.title"]}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text color="text-hard">
              {
                fixtures.financeStrings[
                  "finance.plan.delete-dialog.message.first"
                ]
              }
            </Text>

            <Heading size="sm" marginBottom="20px">
              {title} ?
            </Heading>
            <Text color="text-hard">
              {
                fixtures.financeStrings[
                  "finance.plan.delete-dialog.message.second"
                ]
              }
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} size="sm" onClick={delOnClose}>
              {
                fixtures.financeStrings[
                  "finance.plan.delete-dialog.button.cancel"
                ]
              }
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              size="sm"
              onClick={onConfirmDelete}
            >
              {
                fixtures.financeStrings[
                  "finance.plan.delete-dialog.button.delete"
                ]
              }
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
