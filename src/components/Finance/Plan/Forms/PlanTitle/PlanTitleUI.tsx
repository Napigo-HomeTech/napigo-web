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

interface PlanTitleUIProps {
  defaultValue: string;
  onInputChange?: (value: string) => void;
}
export const PlanTitleUIComponent: React.FC<PlanTitleUIProps> = ({
  defaultValue,
  onInputChange,
}) => {
  return (
    <Editable
      defaultValue={defaultValue}
      isPreviewFocusable={true}
      selectAllOnFocus={false}
      display="flex"
      flexDirection="row"
      gap={2}
      alignItems={"center"}
      justifyContent="flex-start"
      margin={0}
      padding={0}
      onSubmit={(nextValue) => onInputChange?.(nextValue)}
    >
      <Tooltip label="Click to edit">
        <EditablePreview
          fontSize={"25px"}
          borderBottomWidth={1}
          borderBottomColor={"transparent"}
          fontWeight="bold"
        />
      </Tooltip>
      <EditableInput
        rounded={"none"}
        spellCheck={false}
        _focus={{
          borderColor: "transparent",
          boxShadow: "none",
          borderBottomWidth: 1,
          borderBottomColor: "brand.500",
        }}
        width={"300px"}
        fontSize={"25px"}
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
  prevProps: PlanTitleUIProps,
  nextProps: PlanTitleUIProps
) => {
  if (prevProps.defaultValue !== nextProps.defaultValue) {
    return false;
  }
  return true;
};

export const PlanTitleUI = React.memo(
  PlanTitleUIComponent,
  comparePlanTitleEditableProps
);
