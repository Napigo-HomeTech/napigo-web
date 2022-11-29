import { fixtures } from "@/constant/datasets/fixtures";
import {
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaEllipsisV as MenuIcon } from "react-icons/fa";
import React, { useCallback, useRef } from "react";
import { Category, PlanItem } from "@/types/finance.type";
import { store } from "@/lib/Redux/store";
import { useDispatch } from "react-redux";
import { PlanformActions } from "@/lib/Redux/planform.reducer";

type CategoryMenuProps = {
  category: Category;
};
export const CategoryMenu: React.FC<CategoryMenuProps> = ({ category }) => {
  const {
    isOpen: delIsOpen,
    onClose: delOnClose,
    onOpen: delOnOpen,
  } = useDisclosure();

  const dispatch = useDispatch();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onDelete = useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      delOnOpen();
    },
    [delOnOpen]
  );

  const onConfirmDelete = useCallback(() => {
    /**
     *@Step1 Extract all itesm falled in this category and then update its cateogry to unassigned
     */
    const items: PlanItem[] = store.getState().planformStore
      .items as PlanItem[];

    const targetItems = items.map((item: PlanItem) => {
      if (item.category === category.name) {
        return {
          ...item,
          category: "UN-ASSIGNED",
        };
      }
      return item;
    });
    dispatch(PlanformActions.updatePlanItemsList(targetItems));
    dispatch(PlanformActions.removeCategory(category));
    delOnClose();
  }, [category, dispatch, delOnClose]);

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          colorScheme={"base"}
          icon={<MenuIcon />}
          onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
        />

        <MenuList>
          <MenuItem onClick={onDelete} fontSize="md">
            {
              fixtures.financeStrings[
                "finance.planform.category.menu.edit.text"
              ]
            }
          </MenuItem>
          <MenuItem onClick={onDelete} fontSize="md">
            {
              fixtures.financeStrings[
                "finance.planform.category.menu.delete.text"
              ]
            }
          </MenuItem>
        </MenuList>
      </Menu>
      {/* Deleting Form */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={delOnClose}
        isOpen={delIsOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            {
              fixtures.financeStrings[
                "finance.planform.category.menu.delete.dialog.header"
              ]
            }
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {
              fixtures.financeStrings[
                "finance.planform.category.menu.delete.dialog.message"
              ]
            }
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={delOnClose}>
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
    </>
  );
};
