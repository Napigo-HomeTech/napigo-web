import { Button } from "@chakra-ui/react";
import { DateObj, RenderProps } from "dayzed";
import React, { useMemo } from "react";
import {
  DatepickerProps,
  DayOfMonthBtnStyleProps,
} from "../utils/calendarTypes";

interface DayOfMonthProps extends DatepickerProps {
  renderProps: RenderProps;
  isInRange?: boolean | null;
  dateObj: DateObj;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const halfGap = 0.125; //default Chakra-gap-space-1 is 0.25rem

export const DayOfMonth: React.FC<DayOfMonthProps> = ({
  dateObj,
  propsConfigs,
  isInRange,
  renderProps,
  onMouseEnter,
}) => {
  const { date, selected, selectable, today } = dateObj;
  const { getDateProps } = renderProps;
  const {
    defaultBtnProps,
    isInRangeBtnProps,
    selectedBtnProps,
    todayBtnProps,
  } = propsConfigs?.dayOfMonthBtnProps || {};

  const styleBtnProps: DayOfMonthBtnStyleProps = useMemo(
    () => ({
      defaultBtnProps: {
        size: "sm",
        variant: "outline",
        background: "transparent",
        borderColor: "border",
        _after: {
          content: "''",
          position: "absolute",
          top: `-${halfGap}rem`,
          left: `-${halfGap}rem`,
          bottom: `-${halfGap}rem`,
          right: `-${halfGap}rem`,
          borderWidth: `${halfGap}rem`,
          borderColor: "transparent",
        },
        ...defaultBtnProps,
        _hover: selectable
          ? {
              bg: "brand.400",
              ...defaultBtnProps?._hover,
            }
          : undefined,
      },
      isInRangeBtnProps: {
        background: "brand.100",
        ...isInRangeBtnProps,
      },
      selectedBtnProps: {
        background: "brand.500",
        ...selectedBtnProps,
      },
      todayBtnProps: {
        borderColor: "blue.400",
        ...todayBtnProps,
      },
    }),
    [
      defaultBtnProps,
      isInRangeBtnProps,
      selectedBtnProps,
      todayBtnProps,
      selectable,
    ]
  );

  return (
    <Button
      {...getDateProps({
        dateObj,
        disabled: !selectable,
        onMouseEnter: onMouseEnter,
      })}
      disabled={!selectable}
      {...styleBtnProps.defaultBtnProps}
      {...(isInRange && selectable && styleBtnProps.isInRangeBtnProps)}
      {...(selected && selectable && styleBtnProps.selectedBtnProps)}
      {...(today && styleBtnProps.todayBtnProps)}
    >
      {date.getDate()}
    </Button>
  );
};
