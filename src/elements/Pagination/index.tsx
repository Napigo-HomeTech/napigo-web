import { Button, HStack } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React, { useEffect, useState } from "react";

const MAX_BUTTONS = 5;

type PaginationProps = {
  /**
   * Set how many items to render in the grid per page
   */
  countPerPage: number;
  /**
   * Total items available, this info should be fetchedf from Backend API
   */
  totalCounts: number;

  /**
   * Callback handler, triggers when user changing the page by clicking on
   * either the page button or next/prev button
   */
  onPageChange: (page: number) => void;
};
const PaginationComponent = (props: PaginationProps) => {
  const { countPerPage, totalCounts, onPageChange } = props;

  const noOfPages = React.useMemo(() => {
    return Math.ceil(totalCounts / countPerPage);
  }, [totalCounts, countPerPage]);

  /**
   * The current page where user is at, this will update when user click on any
   * page button or the next/prev button
   */
  const [activePage, setActivePage] = useState<number>(1);
  /**
   *
   */
  const [btnSlot, setBtnSlot] = useState<number[]>([]);

  useEffect(() => {
    let i = 1;
    const slots = [];
    for (; i <= noOfPages && i <= MAX_BUTTONS; i++) {
      slots.push(i);
    }

    setBtnSlot(slots);
  }, [noOfPages]);

  /**
   *
   * @param event
   */
  const onNextClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (activePage == btnSlot[btnSlot.length - 1]) {
      /**
       * Case : where active page is already at the last
       * slot when user click on next button
       */
      const newSlots = btnSlot.map((no) => no + 1);
      setBtnSlot(newSlots);
      setActivePage(newSlots[newSlots.length - 1]);
      return;
    }
    /**
     * Case : where active state not on last slot when
     * user click on next
     */
    setActivePage(activePage + 1);
  };

  /**
   * Handler when user click on a specific page button
   * @param slot
   */
  const onPageClick = (slot: number) => {
    setActivePage(slot);
  };

  /**
   *
   * @param event
   */
  const onPrevClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (activePage == btnSlot[0]) {
      /**
       * Case : where active page on the first slot when
       * click on previous button
       */
      const newSlot = btnSlot.map((no) => no - 1);
      setBtnSlot(newSlot);
      setActivePage(newSlot[0]);
    }
    /**
     * Case : where active page not on first slot when
     * user click on previous button
     */

    setActivePage(activePage - 1);
  };
  /**
   * Memo function to determine if the next button should be
   * disbaled or not, based on amount of pages left not-in-view
   */
  const disabledNext = React.useMemo(() => {
    if (noOfPages == 0) return true;
    return btnSlot[btnSlot.length - 1] === noOfPages;
  }, [noOfPages, btnSlot]);

  /**
   * Memo function to determine if the previous button should be
   * disbaled or not, based on amount of pages left not-in-view
   */
  const disabledPrevious = React.useMemo(() => {
    if (noOfPages == 0) return true;
    return btnSlot[0] === 1;
  }, [noOfPages, btnSlot]);

  /**
   * Function to generate the chakra styling props on page button
   * based on its active state
   */
  const pageButtonStyles = React.useCallback(
    (slotNo: number) => {
      return {
        colorScheme: slotNo == activePage ? "brand-gr" : "base",
      };
    },
    [activePage]
  );

  useEffect(() => {
    onPageChange?.(activePage);
  }, [activePage, onPageChange]);

  return (
    <HStack gap={0}>
      <Button disabled={disabledPrevious} size="sm" onClick={onPrevClick}>
        Previous
      </Button>
      {btnSlot.map((slotNo) => (
        <Button
          key={uniqueId()}
          size={"sm"}
          {...pageButtonStyles(slotNo)}
          onClick={() => onPageClick(slotNo)}
        >
          {slotNo}
        </Button>
      ))}
      <Button disabled size={"sm"}>
        ...
      </Button>
      <Button disabled={disabledNext} size={"sm"} onClick={onNextClick}>
        Next
      </Button>
    </HStack>
  );
};

/**
 *
 * @param prevProps
 * @param nextProps
 */
const comparePaginationProps = (
  prevProps: PaginationProps,
  nextProps: PaginationProps
) => {
  if (
    prevProps.countPerPage !== nextProps.countPerPage ||
    prevProps.totalCounts !== nextProps.totalCounts
  ) {
    return false;
  }
  return true;
};

export const Pagination = React.memo(
  PaginationComponent,
  comparePaginationProps
);
