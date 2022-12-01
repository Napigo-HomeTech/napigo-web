import { fixtures } from "@/constant/datasets/fixtures";
import { Form } from "@/elements";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { Category } from "@/types/finance.type";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ColorDropdown } from "../TableControlPanel/ColorsDropdown";

type EditCategoryProps = {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
};
export const EditCategory: React.FC<EditCategoryProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  const [categName, setCategName] = useState<string>(category.name);
  const [color, setColor] = useState<string>(category.colorHex);

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   *
   */
  const onSaveChange = useCallback(() => {
    const categ: Category = {
      /**
       * @Note
       * This will still passing the same old categ_id to the new object
       * that are to be replaced its value
       */
      categ_id: category.categ_id,
      name: isEmpty(categName) ? "Untitled" : (categName as string),
      colorHex: color,
    };
    dispatch(PlanformActions.editCategory(categ));

    onClose();
  }, [categName, category.categ_id, color, dispatch, onClose]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={inputRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {
            fixtures.financeStrings[
              "finance.planform.category.menu.edit.dialog.header-text"
            ]
          }
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack gap={2}>
            <FormControl>
              <FormLabel>
                {
                  fixtures.financeStrings[
                    "finance.planform.controlpanel.add-category.modal.name-input.label"
                  ]
                }
              </FormLabel>
              <Form.TextField
                bg="card"
                ref={inputRef}
                defaultValue={categName}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setCategName(ev.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                {
                  fixtures.financeStrings[
                    "finance.planform.controlpanel.add-category.modal.color-input.label"
                  ]
                }
              </FormLabel>
              <ColorDropdown
                selected={color}
                onChange={(selected) => setColor(selected)}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="brand"
            variant={"outline"}
            mr={3}
            onClick={onSaveChange}
          >
            {
              fixtures.financeStrings[
                "finance.planform.category.menu.edit.dialog.save-change.buttontext"
              ]
            }
          </Button>
          <Button onClick={onClose}>
            {
              fixtures.financeStrings[
                "finance.planform.category.menu.edit.dialog.cancel.buttontext"
              ]
            }
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
