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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { nanoid } from "nanoid";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ColorDropdown } from "./ColorsDropdown";
import { LabelColors } from "./LabelColors";

export const AddCategoryForm: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [categName, setCategName] = useState<string>();
  const [color, setColor] = useState<string>(LabelColors[0]);

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   *
   */
  const onCreate = useCallback(
    (ev: React.MouseEvent) => {
      ev.preventDefault();

      const categ: Category = {
        categ_id: nanoid(),
        name: isEmpty(categName) ? "Untitled" : (categName as string),
        colorHex: color,
      };
      dispatch(PlanformActions.addNewCategory(categ));
      onClose();
    },
    [categName, color, dispatch, onClose]
  );

  return (
    <>
      <Button variant={"outline"} colorScheme="brand" onClick={onOpen}>
        {fixtures.financeStrings["finance.planform.new-category.buttontext"]}
      </Button>

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
                "finance.planform.controlpanel.add-category.modal.header"
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
              onClick={onCreate}
            >
              {
                fixtures.financeStrings[
                  "finance.planform.controlpanel.add-category.modal.buttons.create.text"
                ]
              }
            </Button>
            <Button onClick={onClose}>
              {
                fixtures.financeStrings[
                  "finance.planform.controlpanel.add-category.modal.buttons.cancel.text"
                ]
              }
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
