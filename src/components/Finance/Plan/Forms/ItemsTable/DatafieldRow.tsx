import React from "react";
import { Tr, Td, Checkbox } from "@chakra-ui/react";

import { ItemNameDatafield } from "./ItemNameDatafield";
import { ItemAmountDatafield } from "./ItemAmountDatafield";

import { ItemRemove } from "./ItemRemove";

type DatafieldRowProps = {
  itemId: string;
};
export const DatafieldRow: React.FC<DatafieldRowProps> = ({ itemId }) => {
  return (
    <Tr overflow="visible">
      <Td paddingLeft={1}>
        <ItemNameDatafield itemId={itemId} />
      </Td>
      <Td>
        <ItemAmountDatafield itemId={itemId} />
      </Td>
      <Td
        paddingRight={0}
        isNumeric
        display={"flex"}
        flexDirection="row"
        justifyContent={"flex-end"}
        gap="20px"
      >
        <ItemRemove itemId={itemId} />
        <Checkbox colorScheme={"brand"} />
      </Td>
    </Tr>
  );
};
