import {
  Button,

  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { type ReactNode, type RefObject } from "react";


interface IProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLElement|null>;
  finalRef: RefObject<HTMLElement | null>;
  title:string;
  children:ReactNode;
  okTxt?:string;
  cancelTxt?:string;
  okFunction:()=>void;
}
const ModalCustom = ({ isOpen, onClose ,finalRef,initialRef,okFunction , title, children, cancelTxt='Cancel',okTxt='Done'}: IProps) => {
  return (
    <div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>

          <ModalBody pb={6}>
           {children}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={okFunction}>
              {okTxt}
            </Button>
            <Button onClick={onClose}>{cancelTxt}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalCustom;
