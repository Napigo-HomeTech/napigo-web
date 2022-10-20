import { Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

type ErrorDialogProps = {
    closeable?: boolean;
    err?: Error;
};

export const ErrorDialog: React.FC<ErrorDialogProps> = ({ closeable, err }) => {
    const { isOpen: isDisplay, onClose } = useDisclosure({ defaultIsOpen: true });

    return (
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        <Modal isOpen={isDisplay} isCentered onClose={() => {}}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader as={HStack} alignItems="center" color="red.300">
                    <FaExclamationCircle /> <Heading size="sm">Error</Heading>
                </ModalHeader>
                {closeable && <ModalCloseButton onClick={() => onClose()} />}
                <ModalBody pb="20px">
                    <Text>
                        {err && err.message ? (
                            <>{err.message}</>
                        ) : (
                            <>
                                Sorry, We couldn &lsquo; t proceed further any operation due to some error occured, please try again sometimes or
                                refresh the app
                            </>
                        )}
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
