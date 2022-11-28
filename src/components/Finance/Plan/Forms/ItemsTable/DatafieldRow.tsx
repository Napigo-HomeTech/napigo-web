import React, { useRef } from "react";
import {
  Tr,
  Td,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { FaTrashAlt as RemoveItemIcon } from "react-icons/fa";
import { ItemNameDatafield } from "./ItemNameDatafield";
import { ItemAmountDatafield } from "./ItemAmountDatafield";
import { fixtures } from "@/constant/datasets/fixtures";
import { useDispatch } from "react-redux";
import { PlanformActions } from "@/lib/Redux/planform.reducer";

type DatafieldRowProps = {
  itemId: string;
};
export const DatafieldRow: React.FC<DatafieldRowProps> = ({ itemId }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onConfirmDelete = () => {
    dispatch(PlanformActions.removePlanItem(itemId));
    onClose();
  };

  return (
    <Tr overflow="visible">
      <Td paddingLeft={1}>
        <ItemNameDatafield itemId={itemId} />
      </Td>
      <Td>
        <ItemAmountDatafield itemId={itemId} />
      </Td>
      <Td paddingRight={1} isNumeric>
        <IconButton
          colorScheme={"base"}
          aria-label="Remove item"
          onClick={() => onOpen()}
          color="red.500"
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
            <AlertDialogHeader>
              {
                fixtures.financeStrings[
                  "finance.planform.tableform.item.dialog.deleteitem.header"
                ]
              }
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {
                fixtures.financeStrings[
                  "finance.planform.tableform.item.dialog.deleteitem.message"
                ]
              }
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {
                  fixtures.financeStrings[
                    "finance.planform.tableform.item.dialog.deleteitem.button-cancel"
                  ]
                }
              </Button>
              <Button colorScheme="red" ml={3} onClick={onConfirmDelete}>
                {
                  fixtures.financeStrings[
                    "finance.planform.tableform.item.dialog.deleteitem.button-delete"
                  ]
                }
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Td>
    </Tr>
  );
};
