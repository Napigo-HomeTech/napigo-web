import React from "react";
import { Tr, Td, IconButton } from "@chakra-ui/react";
import { FaTrashAlt as RemoveItemIcon } from "react-icons/fa";
import { ItemNameDatafield } from "./ItemNameDatafield";
import { ItemAmountDatafield } from "./ItemAmountDatafield";

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
        <IconButton
          colorScheme={"base"}
          aria-label="Remove item"
          color="red.500"
          icon={<RemoveItemIcon />}
        />
      </Td>
    </Tr>
  );
};
