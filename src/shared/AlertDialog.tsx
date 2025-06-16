import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { type MutableRefObject } from "react";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  leastDestructiveRef: MutableRefObject<HTMLButtonElement | null>;
  title?: string;
  description?: string;
  CancelText?: string;
  okText?: string;
  onClick: () => void;
  isLoading:boolean;
}
const AlertDialogComponent = ({
  onClick,
  isOpen,
  onClose,
  isLoading,
  leastDestructiveRef,
  title = "Delete Dialog",
  description = `Sure You Want Delete This Product Title `,
  CancelText = "Cancel",
  okText = "Delete",
}: IProps) => {
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={leastDestructiveRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={leastDestructiveRef} onClick={onClose}>
              {CancelText}
            </Button>
            <Button colorScheme="red" ml={3} onClick={onClick} isLoading={isLoading}>
              {okText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDialogComponent;
