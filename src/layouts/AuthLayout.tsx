import { AuthGreeting } from "../components/Authentication/AuthGreeting";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container, Box } from "@chakra-ui/react";

export const AuthLayout: React.FC = () => {
    const location = useLocation();
    return (
        <Container maxW={"900px"} height="100vh" display="flex" justifyContent={"center"} alignItems="center" padding={0}>
            <Box
                display={{ base: "flex" }}
                flexDirection={{ base: "column", md: "row", lg: "row" }}
                gap={{ base: 20 }}
                marginY="auto"
                w="full"
                px={"20px"}
            >
                <Box w={{ sm: "100%", md: "50%" }} alignItems="center" justifyContent={"center"} display="flex">
                    <AuthGreeting type={location.pathname.includes("/register") ? "register" : "login"} />
                </Box>
                <Box w={{ sm: "100%", md: "50%" }} alignItems="center" justifyContent={"center"}>
                    <Outlet />
                </Box>
            </Box>
        </Container>
    );
};
