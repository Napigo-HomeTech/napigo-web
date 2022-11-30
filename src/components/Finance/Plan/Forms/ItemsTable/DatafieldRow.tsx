import React from "react";
import { Tr, Td } from "@chakra-ui/react";

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
      <Td paddingRight={1} isNumeric>
        <ItemRemove itemId={itemId} />
      </Td>
    </Tr>
  );
};
