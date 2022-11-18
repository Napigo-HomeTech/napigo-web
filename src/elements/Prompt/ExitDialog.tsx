import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useRef } from "react";

type ExitDialogProps = {
  header: string;
  exitMessage: string;
  onProceed: () => void;
  onCancel: () => void;
};
export const ExitDialog: React.FC<ExitDialogProps> = ({
  header,
  exitMessage,
  onProceed,
  onCancel,
}) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const onProceedClick = useCallback(() => {
    onProceed();
  }, [onProceed]);

  const onCancelClick = useCallback(() => {
    onClose();
    onCancel();
  }, [onCancel, onClose]);
  return (
    <>
      <div ref={divRef}></div>
      <AlertDialog
        portalProps={{ containerRef: divRef }}
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onCancelClick}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{exitMessage}</AlertDialogBody>
          <AlertDialogFooter>
            <Button size={"sm"} ref={cancelRef} onClick={onCancelClick}>
              No
            </Button>
            <Button
              size={"sm"}
              colorScheme="red"
              ml={3}
              onClick={onProceedClick}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
