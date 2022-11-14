import { HStack, IconButton, Input } from "@chakra-ui/react";
import React, { ChangeEvent, Fragment, useRef, useState } from "react";
import { MdCheck as SaveIcon, MdClose as CancelIcon } from "react-icons/md";

interface PlanTitleEditableProps {
  defaultValue: string;
  onInputChange?: (value: string) => void;
}
export const PlanTitleEditableComponent: React.FC<PlanTitleEditableProps> = ({
  defaultValue,
  onInputChange,
}) => {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [defaultVal, _] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    onInputChange?.(value);
  };

  const onEditClick = (_: React.MouseEvent) => {
    const edit = !onEdit;
    setOnEdit(edit);
  };

  return (
    <HStack>
      <Input
        ref={inputRef}
        padding={0}
        onFocus={() => {
          setOnEdit(true);
        }}
        onBlur={(ev: ChangeEvent<HTMLInputElement>) => {
          setOnEdit(false);
          ev.target.value = defaultVal;
        }}
        rounded="none"
        _disabled={{
          color: "text-hard",
        }}
        _focus={{
          borderWidth: 0,
          borderBottomWidth: 1,
          outline: "none",
          boxShadow: "none",
        }}
        borderWidth="0px"
        fontSize="30px"
        fontWeight={"bold"}
        defaultValue={defaultVal}
        onChange={onChange}
      />
      {onEdit && (
        <Fragment>
          <IconButton
            size={"sm"}
            aria-label="save"
            variant={"outline"}
            colorScheme="brand"
            onClick={onEditClick}
            icon={<SaveIcon />}
          />
          <IconButton
            size={"sm"}
            aria-label="cancel"
            variant={"outline"}
            colorScheme="gray"
            onClick={onEditClick}
            icon={<CancelIcon />}
          />
        </Fragment>
      )}
    </HStack>
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
