import { RootState } from "@/lib/Redux/store";
import { Category, PlanItem } from "@/types/finance.type";
import { Box, ListItem, Text } from "@chakra-ui/react";
import currency from "currency.js";
import { uniqueId } from "lodash";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

export const CategoryDatafieldController: React.FC<Category> = (props) => {
  const { items } = useSelector((state: RootState) => state.planformStore);

  const totalAmount = useMemo(() => {
    const targets = items!.filter(
      (item: PlanItem) =>
        item.category.toUpperCase() === props.name.toUpperCase()
    );
    let sum = "0.00";
    targets.forEach((item: PlanItem) => {
      sum = currency(item.amount).add(sum).format();
    });

    return currency(sum, { precision: 2, symbol: "$" }).format();
  }, [items, props.name]);

  return (
    <MemoCategoryDatafield
      name={props.name}
      colorHex={props.colorHex}
      value={totalAmount}
    />
  );
};

type CategoryDatafieldProps = {
  name: string;
  colorHex: string;
  value: string;
};
const CategoryDatafield: React.FC<CategoryDatafieldProps> = ({
  name,
  colorHex,
  value,
}) => {
  return (
    <ListItem
      key={uniqueId()}
      width="inherit"
      marginY="20px"
      flexDirection={"row"}
      display="flex"
      alignItems={"center"}
      gap={2}
    >
      <Box height="10px" width="10px" rounded={"full"} bg={colorHex} />
      <Text fontSize="14px">{name}</Text>
      <Text fontSize={"14px"} fontWeight="bold" marginLeft={"auto"}>
        {value}
      </Text>
    </ListItem>
  );
};

const compareProps = (
  prev: CategoryDatafieldProps,
  next: CategoryDatafieldProps
) => {
  if (
    prev.name !== next.name ||
    prev.colorHex !== next.colorHex ||
    prev.value !== next.value
  ) {
    return false;
  }
  return true;
};

const MemoCategoryDatafield = React.memo(CategoryDatafield, compareProps);
