import { fixtures } from "@/constant/datasets/fixtures";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { RootState } from "@/lib/Redux/store";
import { Category, PlanItem } from "@/types/finance.type";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import currency from "currency.js";
import _, { uniqueId } from "lodash";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatafieldRow } from "./DatafieldRow";

type TableFormControllerProps = {
  category: Category;
};
export const TableForm: React.FC<TableFormControllerProps> = ({ category }) => {
  const dispatch = useDispatch();
  /**
   *
   */
  const planItems: PlanItem[] | undefined = useSelector(
    (state: RootState) => state.planformStore.items
  );

  /**
   * Collect all the item object which belong to this category by categ_id
   * @return List of item_ids, example;
   * ['V1StGXR8_Z5jdHi6B-myT', 'V1StGXR8_Z5jdHi6B-mydv', 'V1StGXR8_Z5jdHi6B-myT']
   */
  const ItemsInCategory = useMemo(() => {
    const items = planItems
      ?.filter((item: PlanItem) => item.category_id === category.categ_id)
      .map((item: PlanItem) => item.item_id);
    return items ?? [];
  }, [planItems, category]);

  /**
   *
   * @param ev
   */
  const onAddItemClick = (ev: React.MouseEvent) => {
    ev.preventDefault();
    dispatch(
      PlanformActions.addNewPlanItem({
        item_id: nanoid(),
        category_id: category.categ_id,
        name: "",
        amount: currency(0.0, { precision: 2, symbol: "" }).format(),
      })
    );
  };

  return <TableFormMemo itemIds={ItemsInCategory} onAddItem={onAddItemClick} />;
};
type TableFormProps = {
  itemIds: string[];
  onAddItem: (ev: React.MouseEvent) => void;
};
const MemoTableFormV2: React.FC<TableFormProps> = ({ itemIds, onAddItem }) => {
  const ShouldRenderTable = Boolean(itemIds.length >= 1);

  return (
    <TableContainer>
      <Table variant={"simple"}>
        {ShouldRenderTable && (
          <>
            <Thead>
              <Tr>
                <Th paddingLeft={0}>
                  {
                    fixtures.financeStrings[
                      "finance.planform.tableform.tablehead.itemname.text"
                    ]
                  }
                </Th>
                <Th>
                  {
                    fixtures.financeStrings[
                      "finance.planform.tableform.tablehead.amount.text"
                    ]
                  }
                </Th>
                <Th paddingRight={0} align="right" isNumeric>
                  {
                    fixtures.financeStrings[
                      "finance.planform.tableform.tablehead.action.text"
                    ]
                  }
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {itemIds.map((itemId: string) => (
                <DatafieldRow key={uniqueId()} itemId={itemId} />
              ))}
            </Tbody>
          </>
        )}
        <Tfoot>
          <Tr>
            <Th paddingLeft={0}>
              <Button onClick={onAddItem}>
                {
                  fixtures.financeStrings[
                    "finance.planform.tableform.additem.buttontext"
                  ]
                }
              </Button>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

const compareTableFormProps = (prev: TableFormProps, next: TableFormProps) => {
  return _.isEqual(prev.itemIds, next.itemIds);
};

const TableFormMemo = React.memo(MemoTableFormV2, compareTableFormProps);
