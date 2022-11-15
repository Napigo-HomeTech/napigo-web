/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Tooltip,
  useEditableControls,
} from "@chakra-ui/react";
import React from "react";
import { MdCheck as SaveIcon, MdClose as CancelIcon } from "react-icons/md";

function EditableControls() {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="start" size="sm">
      <IconButton
        aria-label="save"
        icon={<SaveIcon />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="cancel"
        icon={<CancelIcon />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : null;
}

interface PlanTitleEditableProps {
  defaultValue: string;
  onInputChange?: (value: string) => void;
}
export const PlanTitleEditableComponent: React.FC<PlanTitleEditableProps> = ({
  defaultValue,
  onInputChange,
}) => {
  return (
    <Editable
      defaultValue="Rasengan "
      isPreviewFocusable={true}
      selectAllOnFocus={false}
      display="flex"
      flexDirection="row"
      gap={2}
      alignItems={"center"}
      justifyContent="flex-start"
      margin={0}
    >
      <Tooltip label="Click to edit">
        <EditablePreview fontSize={"30px"} fontWeight="bold" />
      </Tooltip>
      <EditableInput
        rounded={"none"}
        _focus={{
          borderColor: "transparent",
          boxShadow: "none",
          borderBottomWidth: 1,
          borderBottomColor: "brand.500",
        }}
        width={"500px"}
        fontSize={"30px"}
        fontWeight="bold"
      />
      <EditableControls />
    </Editable>
  );
};

/**
 *
 * @param prevProps
 * @param nextProps
 */
const comparePlanTitleEditableProps = (
  prevProps: PlanTitleEditableProps,
  nextProps: PlanTitleEditableProps
) => {
  if (prevProps.defaultValue !== nextProps.defaultValue) {
    return false;
  }
  return true;
};

export const PlanTitleEditable = React.memo(
  PlanTitleEditableComponent,
  comparePlanTitleEditableProps
);
