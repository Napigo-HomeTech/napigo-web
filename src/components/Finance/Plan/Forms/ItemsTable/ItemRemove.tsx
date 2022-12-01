import React, { useCallback, useRef } from "react";
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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaTrashAlt as RemoveItemIcon } from "react-icons/fa";
import { fixtures } from "@/constant/datasets/fixtures";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/store";
import { find } from "lodash";
import { PlanformActions } from "@/lib/Redux/planform.reducer";

type ItemRemoveProps = {
  itemId: string;
};
export const ItemRemove: React.FC<ItemRemoveProps> = ({ itemId }) => {
  const dispatch = useDispatch();
  const itemName = useSelector((state: RootState) => {
    const items = state.planformStore.items;
    const target = find(items, { item_id: itemId });
    return target?.name;
  });

  const onConfirmDelete = useCallback(() => {
    dispatch(PlanformActions.removePlanItem(itemId));
  }, [dispatch, itemId]);

  return (
    <MemoizedItemRemove
      itemName={itemName as string}
      onConfirmDelete={onConfirmDelete}
    />
  );
};

type MemoItemRemoveProps = {
  itemName: string;
  onConfirmDelete: () => void;
};
const MemoItemRemove = ({ itemName, onConfirmDelete }: MemoItemRemoveProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  return (
    <>
      <IconButton
        colorScheme={"base"}
        aria-label="Remove item"
        onClick={() => onOpen()}
        color="red.500"
        size="sm"
        icon={<RemoveItemIcon />}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader color="text-hard">
            {
              fixtures.financeStrings[
                "finance.planform.tableform.item.dialog.deleteitem.header"
              ]
            }
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Heading size="sm" marginBottom={0}>
              {itemName}
            </Heading>
            <Text color="text-hard">
              {
                fixtures.financeStrings[
                  "finance.planform.tableform.item.dialog.deleteitem.message"
                ]
              }
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {
                fixtures.financeStrings[
                  "finance.planform.tableform.item.dialog.deleteitem.button-cancel"
                ]
              }
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                onConfirmDelete();
                onClose();
              }}
            >
              {
                fixtures.financeStrings[
                  "finance.planform.tableform.item.dialog.deleteitem.button-delete"
                ]
              }
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

/**
 *
 * @param prev
 * @param next
 * @returns
 */
const compareProps = (prev: MemoItemRemoveProps, next: MemoItemRemoveProps) => {
  if (prev.itemName !== next.itemName) {
    return false;
  }
  return true;
};
const MemoizedItemRemove = React.memo(MemoItemRemove, compareProps);
