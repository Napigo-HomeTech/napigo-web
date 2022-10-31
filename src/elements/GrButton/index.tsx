import { Button, ButtonProps, ComponentWithAs } from "@chakra-ui/react";

export const GrButton: ComponentWithAs<"button", ButtonProps> = (props) => {
    const token = "brand-gr";
    return (
        <Button
            {...props}
            bg={token}
            borderWidth={1}
            color="white"
            _hover={{ bg: token, boxShadow: "md" }}
            _active={{ bg: token }}
            borderColor={"brand.500"}
        />
    );
};
