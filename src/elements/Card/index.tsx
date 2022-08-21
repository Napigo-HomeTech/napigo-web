import { Box, ChakraComponent, useStyleConfig } from "@chakra-ui/react";

/**
 *
 * @param props
 * @returns
 */
export const Card: ChakraComponent<"div"> = (props) => {
  const { variants, ...rest } = props;

  const styles = useStyleConfig("Card", variants);

  return <Box __css={styles} {...rest} />;
};
