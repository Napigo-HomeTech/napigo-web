import React, { useCallback } from "react";
import { fixtures } from "@/constant/datasets/fixtures";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { ReactComponent as Background } from "@/assets/images/plan-banner-3.svg";

type PlanBannerProps = {
  title?: string;
  onButtonClick?: CallableFunction;
  buttonText?: string;
  imageLeftSrc?: string;
  imageRightSrc?: string;
};
export const PlanBanner: React.FC<PlanBannerProps> = (props) => {
  const { title, onButtonClick, buttonText } = props;

  const getButtonColorStyles = useCallback(() => {
    return {
      bg: "brand.600",
      color: "card",
      borderColor: "transparent",
      borderWidth: "1px",
      _hover: {
        bg: "brand.700",
        color: "card",
      },
      _active: {
        bg: "brand.800",
        color: "card",
      },
    };
  }, []);

  const onClick = (e: React.MouseEvent) => {
    onButtonClick?.(e);
  };

  return (
    <VStack
      bg="brand-gr"
      width={"100%"}
      height="130px"
      rounded={"md"}
      p="10px"
      justifyContent={"space-between"}
      alignItems="flex-start"
      position={"relative"}
      overflow={"hidden"}
    >
      <Box
        position={"absolute"}
        width="100%"
        height="100%"
        top={0}
        left={0}
        zIndex={10}
        display={"flex"}
        flexDirection="row"
        alignItems={"center"}
        justifyContent="center"
      >
        <Background />
      </Box>
      <Heading size="md" color="card" zIndex={20}>
        {title ?? fixtures.financeStrings["finance.plan.banner.title"]}
      </Heading>

      <Button
        zIndex={20}
        {...getButtonColorStyles()}
        size="sm"
        onClick={onClick}
        minWidth="200px"
      >
        {buttonText ?? "Find out more!"}
      </Button>
    </VStack>
  );
};
