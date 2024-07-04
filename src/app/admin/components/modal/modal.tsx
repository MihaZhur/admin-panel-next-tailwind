import {
    Modal as ModalComponent,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';
import React from 'react';
interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose }) => {
    return (
        <ModalComponent
            backdrop={'blur'}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                        <ModalBody>
                            <p> were</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Close
                            </Button>
                            <Button
                                color="primary"
                                onPress={onClose}
                            >
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </ModalComponent>
    );
};
