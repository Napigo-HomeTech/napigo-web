import { Button, ButtonProps, ComponentWithAs } from "@chakra-ui/react";

export const BrandButton: ComponentWithAs<"button", ButtonProps> = (props) => {
    delete props.bg;
    delete props._hover;
    delete props.colorScheme;
    return <Button {...props} bg="brand-gr" _hover={{ bg: "brand-gr" }} />;
};
