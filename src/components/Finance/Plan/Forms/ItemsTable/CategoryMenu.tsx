import { fixtures } from "@/constant/datasets/fixtures";
import {
  IconButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaEllipsisV as MenuIcon } from "react-icons/fa";
import React, { useCallback } from "react";
import { Category } from "@/types/finance.type";
import { EditCategory } from "./EditCategory";
import { DeletingCategory } from "./DeletingCategory";

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

  const onDelete = useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      delOnOpen();
    },
    [delOnOpen]
  );

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
      <DeletingCategory
        isOpen={delIsOpen}
        onClose={delOnClose}
        category={category}
      />
    </>
  );
};
