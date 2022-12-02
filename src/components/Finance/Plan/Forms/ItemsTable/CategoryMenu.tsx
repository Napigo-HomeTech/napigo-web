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
  Heading,
  Text,
} from "@chakra-ui/react";
import { FaEllipsisV as MenuIcon } from "react-icons/fa";
import React, { useCallback, useRef } from "react";
import { Category, PlanItem } from "@/types/finance.type";
import { store } from "@/lib/Redux/store";
import { useDispatch } from "react-redux";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { EditCategory } from "./EditCategory";

type CategoryMenuProps = {
  category: Category;
};
export const CategoryMenu: React.FC<CategoryMenuProps> = ({ category }) => {
  const {
    isOpen: delIsOpen,
    onClose: delOnClose,
    onOpen: delOnOpen,
  } = useDisclosure();

  const {
    isOpen: editIsOpen,
    onClose: editOnClose,
    onOpen: editOnOpen,
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
     *@Step1 Extract all items falls in this category ( by categ_id ) and then update move it to unassigned
     Unassigned categ_id should be value of "unassigned". Its a constant value defined by backend for the
     sake of simplicity
     */
    const items: PlanItem[] = store.getState().planformStore
      .items as PlanItem[];

    const targetItems = items.map((item: PlanItem) => {
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
    dispatch(PlanformActions.updatePlanItemsList(targetItems));
    dispatch(PlanformActions.removeCategory(category));
    delOnClose();
  }, [category, dispatch, delOnClose]);

  const onEdit = useCallback(() => {
    editOnOpen();
  }, [editOnOpen]);

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          colorScheme={"base"}
          size="sm"
          icon={<MenuIcon />}
          onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
        />

        <MenuList>
          <MenuItem onClick={onEdit} fontSize="md">
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
      {/* Editing Form */}
      <EditCategory
        isOpen={editIsOpen}
        onClose={editOnClose}
        category={category}
      />
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
            <Text color="text-hard">
              {
                fixtures.financeStrings[
                  "finance.planform.category.menu.delete.dialog.message"
                ]
              }
            </Text>
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
