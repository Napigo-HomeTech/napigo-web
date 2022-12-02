import { fixtures } from "@/constant/datasets/fixtures";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { store } from "@/lib/Redux/store";
import { Category, PlanItem } from "@/types/finance.type";
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
  Text,
  Switch,
} from "@chakra-ui/react";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

type DeletingCategoryProps = {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
};
export const DeletingCategory: React.FC<DeletingCategoryProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  const [shouldTransferItem, setShouldTransferItem] = useState<boolean>(false);

  /**
   *
   */
  const onConfirmDelete = useCallback(() => {
    /**
     *@Step1 Extract all items falls in this category ( by categ_id ) and then update move it to unassigned
     Unassigned categ_id should be value of "unassigned". Its a constant value defined by backend for the
     sake of simplicity
     */
    const items: PlanItem[] = store.getState().planformStore
      .items as PlanItem[];

    let targetItems = [];
    if (shouldTransferItem) {
      targetItems = items.map((item: PlanItem) => {
        if (item.category_id === category.categ_id) {
          /**
           * @ONWATCH - WILL GET BACK HERE
           */
          return {
            ...item,
            category_id: "unassigned",
          };
        }
        return item;
      });
    } else {
      targetItems = items.filter(
        (item: PlanItem) => item.category_id !== category.categ_id
      );
    }

    dispatch(PlanformActions.updatePlanItemsList(targetItems));
    dispatch(PlanformActions.removeCategory(category));
    onClose();
  }, [category, dispatch, onClose, shouldTransferItem]);

  const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const checked = ev.target.checked;
    setShouldTransferItem(checked);
  }, []);

  return (
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
              "finance.planform.category.menu.delete.dialog.header"
            ]
          }
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Heading size="sm">{category.name}</Heading>

          <Text color="text-hard" marginTop={"20px"}>
            {
              fixtures.financeStrings[
                "finance.planform.category.menu.delete.dialog.transfer-item.message"
              ]
            }
          </Text>
          <Switch colorScheme={"brand"} onChange={onChange} />
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            {
              fixtures.financeStrings[
                "finance.planform.category.menu.delete.dialog.button.cancel"
              ]
            }
          </Button>
          <Button colorScheme="red" ml={3} onClick={onConfirmDelete}>
            {
              fixtures.financeStrings[
                "finance.planform.category.menu.delete.dialog.button.delete"
              ]
            }
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
