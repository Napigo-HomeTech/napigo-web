import { Button, ButtonProps } from "@chakra-ui/react";
import { Calendar, GetBackForwardPropsOptions } from "dayzed";
import React, { Fragment } from "react";
import { DatepickerProps } from "../utils/calendarTypes";
import {
    IoArrowBackCircle as YearBackIcon,
    IoArrowBack as MonthBackIcon,
    IoArrowForwardCircle as YearForwardIcon,
    IoArrowForward as MonthForwardIcon,
} from "react-icons/io5";

export interface DatepickerBackBtnsProps extends DatepickerProps {
    calendars: Calendar[];
    getBackProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
}

const DefaultBtnStyle: ButtonProps = {
    variant: "ghost",
    size: "sm",
};

export const DatepickerBackBtns: React.FC<DatepickerBackBtnsProps> = (
    props
) => {
    const { calendars, getBackProps } = props;
    const customBtnProps = props.propsConfigs?.dateNavBtnProps;
    return (
        <Fragment>
            <Button
                {...getBackProps({
                    calendars,
                    offset: 12,
                })}
                {...DefaultBtnStyle}
                {...customBtnProps}
            >
                <YearBackIcon size={20} />
            </Button>
            <Button
                {...getBackProps({ calendars })}
                {...DefaultBtnStyle}
                {...customBtnProps}
            >
                <MonthBackIcon size={20} />
            </Button>
        </Fragment>
    );
};

export interface DatepickerForwardBtnsProps extends DatepickerProps {
    calendars: Calendar[];
    getForwardProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
}

export const DatepickerForwardBtns: React.FC<DatepickerForwardBtnsProps> = (
    props
) => {
    const { calendars, getForwardProps } = props;
    const customBtnProps = props.propsConfigs?.dateNavBtnProps;
    return (
        <Fragment>
            <Button
                {...getForwardProps({ calendars })}
                {...DefaultBtnStyle}
                {...customBtnProps}
            >
                <MonthForwardIcon size={20} />
            </Button>
            <Button
                {...getForwardProps({
                    calendars,
                    offset: 12,
                })}
                {...DefaultBtnStyle}
                {...customBtnProps}
            >
                <YearForwardIcon size={20} />
            </Button>
        </Fragment>
    );
};
