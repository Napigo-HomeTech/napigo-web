import React, { useState } from "react";
import { SingleDatepicker as ChakraSingleDatepicker } from "chakra-dayzed-datepicker";

export const SingleDatePicker: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const propConfigs = {
    dateNavBtnProps: {
      // colorScheme: "base",
      variant: "outline",
    },
    dayOfMonthBtnProps: {
      defaultBtnProps: {
        borderColor: "card-border-color",
        _hover: {
          background: "brand.400",
          borderColor: "brand.400",
        },
      },
      isInRangeBtnProps: {
        color: "yellow",
      },
      selectedBtnProps: {
        background: "brand.500",
        color: "white",
      },
      todayBtnProps: {
        background: "blue.500",
      },
    },
    inputProps: {
      size: "md",
    },
  };
  return (
    <ChakraSingleDatepicker
      propsConfigs={propConfigs}
      name="date-input"
      date={date}
      onDateChange={setDate}
    />
  );
};
