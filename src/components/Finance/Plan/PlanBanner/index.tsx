import React, { useCallback } from "react";
import { fixtures } from "@/constant/datasets/fixtures";
import { Button, Heading, Image, VStack } from "@chakra-ui/react";
import PlanBannerCalculator from "@/assets/images/plan-banner-calculator.svg";
import PlanBannerCoins from "@/assets/images/plan-banner-coins.svg";

type PlanBannerProps = {
    title?: string;
    onButtonClick?: CallableFunction;
    buttonText?: string;
    imageLeftSrc?: string;
    imageRightSrc?: string;
};
export const PlanBanner: React.FC<PlanBannerProps> = (props) => {
    const { title, onButtonClick, imageLeftSrc, imageRightSrc, buttonText } = props;

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
            justifyContent={"flex-start"}
            alignItems="flex-start"
            position={"relative"}
            overflow={"hidden"}
        >
            <Heading size="sm" color="card">
                {title ?? fixtures.financeStrings["finance.plan.banner.title"]}
            </Heading>

            <Image src={imageLeftSrc ?? PlanBannerCalculator} alt="plan banner calculator image" />
            <Image position={"absolute"} right="5%" src={imageRightSrc ?? PlanBannerCoins} alt="plan banner calculator image" />
            <Button {...getButtonColorStyles()} size="sm" onClick={onClick} position="absolute" bottom="10%" left="15%" minWidth="200px">
                {buttonText ?? "Find out more!"}
            </Button>
        </VStack>
    );
};
