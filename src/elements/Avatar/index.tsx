import { useAccount } from "@/lib/Accounts/useAccount";
import { Avatar as ChakraAvatar, AvatarProps } from "@chakra-ui/react";
import React from "react";

export const Avatar: React.FC<AvatarProps> = (props) => {
    const { name, src, ...rest } = props;
    const account = useAccount();
    return (
        <ChakraAvatar
            {...rest}
            name={name ?? account?.displayName ?? account?.email}
            src={src ?? account?.photo_url ?? ""}
        />
    );
};
