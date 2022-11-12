import { Box, ChakraComponent, useStyleConfig } from "@chakra-ui/react";

/**
 *
 * @param props
 * @returns
 */
export const Card: ChakraComponent<"div"> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { variants, ...rest } = props;

  const styles = useStyleConfig("Card", variants);

  return <Box __css={styles} {...rest} />;
};
