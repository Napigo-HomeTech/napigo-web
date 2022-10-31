/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment } from "react";
import LottiePlayer from "react-lottie-player";
import loaderAnim from "../../assets/napi-anim.json";
import { NapigoLogoLg as Logo } from "@/common/Logo";
import { AnimatePresence, isValidMotionProp, motion } from "framer-motion";
import { Avatar, Box, chakra, Heading, Text } from "@chakra-ui/react";
import FounderImage from "../../assets/images/founder.png";

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

/**
 * @description
 * This Component will be use to display the app loading state before user
 * able to see anything else and before they could interact with any component
 * @returns
 */
export const PreLaunch: React.FC = () => {
    return (
        <Fragment>
            <AnimatePresence initial={true}>
                <Box position="fixed" left={0} top={0} w="100vw" h="100vh" bg="body" zIndex="banner">
                    <ChakraBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: "100%" }}
                        exit={{ opacity: 0 }}
                        // @ts-ignore
                        transition={{
                            delay: 0.5,
                            duration: 0.3,
                        }}
                        display="flex"
                        height="100%"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Logo />
                        <ChakraBox
                            initial={{
                                opacity: 0,
                                translateY: 0,
                            }}
                            animate={{
                                opacity: "100%",
                                translateY: 0,
                            }}
                            exit={{
                                opacity: 0,
                                translateY: 0,
                            }}
                            // @ts-ignore
                            transition={{
                                transform: {
                                    duration: 0.2,
                                },
                                delay: 0.5,
                                duration: 0.6,
                            }}
                        >
                            <LottiePlayer loop animationData={loaderAnim} play style={{ width: 300, height: 300 }} />
                        </ChakraBox>
                        <ChakraBox
                            initial={{ opacity: 0 }}
                            animate={{ opacity: "100%" }}
                            exit={{ opacity: 0 }}
                            // @ts-ignore
                            transition={{
                                delay: 2,
                                duration: 0.3,
                            }}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            my="30px"
                            gap={5}
                        >
                            <Heading size="sm">Launching in 2023</Heading>
                            <Text>
                                Build with ♡ by Napihup <Avatar src={FounderImage} size="sm" />
                            </Text>
                        </ChakraBox>
                    </ChakraBox>
                </Box>
            </AnimatePresence>
        </Fragment>
    );
};
