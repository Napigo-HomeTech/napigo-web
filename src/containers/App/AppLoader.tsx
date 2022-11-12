import React, { Fragment } from "react";
import { NapigoLogoLg as Logo } from "@/common/Logo";
import { AnimatePresence, motion, isValidMotionProp } from "framer-motion";
import { chakra, Box, Spinner } from "@chakra-ui/react";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

/**
 * @description
 * This Component will be use to display the app loading state before user
 * able to see anything else and before they could interact with any component
 * @returns
 */
export const AppLoader: React.FC = () => {
  return (
    <Fragment>
      <AnimatePresence initial={true}>
        <Box
          position="fixed"
          left={0}
          top={0}
          w="100vw"
          h="100vh"
          zIndex="banner"
          overflow="hidden"
          bg={"card"}
        >
          <ChakraBox
            initial={{ opacity: 0 }}
            animate={{ opacity: "100%" }}
            exit={{ opacity: 0 }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
              delay: 0.5,
              duration: 0.3,
            }}
            display="flex"
            mx="auto"
            h={"100%"}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Logo />
            <ChakraBox
              m="40px"
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore no problem in operation, although type error appears.
              transition={{
                transform: {
                  duration: 0.2,
                },
                delay: 1,
                duration: 0.6,
              }}
            >
              <Spinner
                color="brand.500"
                size="lg"
                thickness="4px"
                emptyColor="brandAlpha.300"
              />
            </ChakraBox>
          </ChakraBox>
        </Box>
      </AnimatePresence>
    </Fragment>
  );
};
