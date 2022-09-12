import {
  HStack,
  VStack,
  Heading,
  Divider,
  SimpleGrid,
  Box,
  Stack,
} from "@chakra-ui/react";
import { useDayzed, Props as DayzedHookProps } from "dayzed";
import { ArrowKeysReact } from "../utils/arrowKeys";
import React, { useCallback } from "react";
import { DatepickerConfigs, DatepickerProps } from "../utils/calendarTypes";
import { DayOfMonth } from "./DayOfMonth";
import { DatepickerBackBtns, DatepickerForwardBtns } from "./DateNavButtons";

interface CalendarPanelProps extends DatepickerProps {
  dayzedHookProps: DayzedHookProps;
  configs: DatepickerConfigs;
  onMouseEnterHighlight?: (data: Date) => void;
  isInRange?: (date: Date) => boolean | null;
}

export const CalendarPanel: React.FC<CalendarPanelProps> = (props) => {
  const {
    dayzedHookProps,
    configs,
    propsConfigs,
    onMouseEnterHighlight,
    isInRange,
  } = props;

  const renderProps = useDayzed(dayzedHookProps);
  const { calendars, getBackProps, getForwardProps } = renderProps;

  const getKeyOffset = useCallback((num: number) => {
    const e = document.activeElement;
    const buttons = document.querySelectorAll("button");
    buttons.forEach((el, i) => {
      const newNodeKey = i + num;
      if (el === e) {
        if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
          buttons[newNodeKey].focus();
        } else {
          buttons[0].focus();
        }
      }
    });
  }, []);

  const arrowKeys = new ArrowKeysReact({
    left: () => {
      getKeyOffset(-1);
    },
    right: () => {
      getKeyOffset(1);
    },
    up: () => {
      getKeyOffset(-7);
    },
    down: () => {
      getKeyOffset(7);
    },
  });

  return (
    <Stack direction={["column", "column", "row"]} {...arrowKeys.getEvents()}>
      {calendars.map((calendar, calendarIdx) => {
        return (
          <VStack key={calendarIdx} height="100%" rounded={"md"}>
            <HStack>
              <DatepickerBackBtns
                calendars={calendars}
                getBackProps={getBackProps}
                propsConfigs={propsConfigs}
              />
              <Heading size="sm" minWidth={"5rem"} textAlign="center">
                {configs.monthNames[calendar.month]} {calendar.year}
              </Heading>
              <DatepickerForwardBtns
                calendars={calendars}
                getForwardProps={getForwardProps}
                propsConfigs={propsConfigs}
              />
            </HStack>
            <Divider />
            <SimpleGrid columns={7} spacing={1} textAlign="center">
              {configs.dayNames.map((day, dayIdx) => (
                <Box fontSize="sm" fontWeight="semibold" key={dayIdx}>
                  {day}
                </Box>
              ))}
              {calendar.weeks.map((week, weekIdx) => {
                return week.map((dateObj, index) => {
                  const key = `${calendar.month}-${calendar.year}-${weekIdx}-${index}`;
                  if (!dateObj) return <Box key={key} />;
                  const { date } = dateObj;
                  return (
                    <DayOfMonth
                      key={key}
                      dateObj={dateObj}
                      propsConfigs={propsConfigs}
                      renderProps={renderProps}
                      isInRange={isInRange && isInRange(date)}
                      onMouseEnter={() => {
                        if (onMouseEnterHighlight) onMouseEnterHighlight(date);
                      }}
                    />
                  );
                });
              })}
            </SimpleGrid>
          </VStack>
        );
      })}
    </Stack>
  );
};
