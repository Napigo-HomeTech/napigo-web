import React, { useMemo, useState } from "react";
import {
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Portal,
    useDisclosure,
    Button,
    Divider,
} from "@chakra-ui/react";
import { format } from "date-fns";
import FocusLock from "react-focus-lock";
import { Month_Names_Short, Weekday_Names_Short } from "./utils/calendarUtils";
import { CalendarPanel } from "./Widgets/CalendarPanel";
import { DatepickerConfigs, DatepickerProps, OnDateSelected } from "./utils/calendarTypes";
import { CalendarIcon } from "@chakra-ui/icons";

export interface SingleDatepickerProps extends DatepickerProps {
    label?: string;
    onDateChange?: (date: Date) => void;
    configs?: DatepickerConfigs;
    disabled?: boolean;
    defaultIsOpen?: boolean;
    id?: string;
    name?: string;
    usePortal?: boolean;
}

const DefaultConfigs = {
    dateFormat: "dd-MM-yyyy",
    monthNames: Month_Names_Short,
    dayNames: Weekday_Names_Short,
};

export const SingleDatepicker: React.FC<SingleDatepickerProps> = ({
    label,
    configs = DefaultConfigs,
    propsConfigs,
    usePortal,
    defaultIsOpen = false,
    ...props
}) => {
    const { name, disabled, onDateChange, id, minDate, maxDate } = props;

    const [dateInView, setDateInView] = useState<Date | undefined>(undefined);
    const [rawTypedInput, setRawTypedInput] = useState<string>("");
    const [offset, setOffset] = useState(0);

    const { onOpen, onClose, isOpen } = useDisclosure({ defaultIsOpen });

    const onPopoverClose = () => {
        onClose();
        setOffset(0);
    };

    const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
        if (!selectable) return;
        if (date instanceof Date && !isNaN(date.getTime())) {
            setDateInView(date);
            onDateChange?.(date);
            onClose();
            return;
        }
    };

    const PopoverContentWrapper = usePortal ? Portal : React.Fragment;

    const inputValue = useMemo(() => {
        return dateInView ? format(dateInView, configs.dateFormat) : rawTypedInput;
    }, [configs.dateFormat, dateInView, rawTypedInput]);

    const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRawTypedInput(event.target.value);
        setDateInView(undefined);
    };

    return (
        <Popover placement="bottom-start" variant="responsive" isOpen={isOpen} onClose={onPopoverClose} isLazy>
            <PopoverTrigger>
                <FormControl>
                    {label && <FormLabel>{label}</FormLabel>}
                    <InputGroup>
                        <Input
                            id={id}
                            autoComplete="off"
                            isDisabled={disabled}
                            name={name}
                            value={inputValue}
                            onChange={handleInputOnChange}
                            // eslint-disable-next-line @typescript-eslint/no-empty-function
                            onFocus={() => {}}
                        />
                        <InputRightElement padding="5px">
                            <IconButton
                                tabIndex={-1}
                                _hover={{ background: "transparent" }}
                                _active={{ background: "transparent" }}
                                variant="ghost"
                                backgroundColor="transparent"
                                aria-label="calendar popup"
                                onClick={() => onOpen()}
                                icon={<CalendarIcon />}
                            />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </PopoverTrigger>
            <PopoverContentWrapper>
                <PopoverContent width="100%">
                    <PopoverBody>
                        <FocusLock>
                            <CalendarPanel
                                dayzedHookProps={{
                                    showOutsideDays: true,
                                    onDateSelected: handleOnDateSelected,
                                    selected: dateInView,
                                    date: dateInView,
                                    minDate: minDate,
                                    maxDate: maxDate,
                                    offset: offset,
                                    onOffsetChanged: setOffset,
                                }}
                                configs={configs}
                                propsConfigs={propsConfigs}
                            />
                        </FocusLock>
                        <Divider my="10px" />
                        <HStack py="10px" justifyContent="flex-end">
                            <Button size="sm">Today</Button>
                            <Button size="sm">Clear</Button>
                        </HStack>
                    </PopoverBody>
                </PopoverContent>
            </PopoverContentWrapper>
        </Popover>
    );
};
