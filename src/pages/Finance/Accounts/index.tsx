import { EmptyAccountGrid } from "@/components/Finance/Accounts/EmptyAccountGrid";
import { Box } from "@chakra-ui/react";
import React from "react";

/**
 * This is the root page where user should see the
 * main grid view of all their accounts
 * @returns
 */
export const AccountsPage: React.FC = () => {
    return (
        <Box>
            <EmptyAccountGrid />
        </Box>
    );
};
