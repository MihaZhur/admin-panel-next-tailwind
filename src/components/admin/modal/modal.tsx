import { Modal as ModalComponent, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';
interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    textConfirm?: string;
    textClose?: string;
    title?: string;
    isLoadingConfirm?: boolean;
    isFooter?: boolean;
}

export const Modal: React.FC<PropsWithChildren<Props>> = ({
    isOpen,
    onClose,
    onConfirm,
    textConfirm = 'Сохранить',
    textClose = 'Отмена',
    title,
    children,
    isLoadingConfirm,
    isFooter = true,
}) => {
    return (
        <ModalComponent
            backdrop={'blur'}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col dark:text-white gap-1">{title}</ModalHeader>
                        <ModalBody>{children}</ModalBody>
                        {isFooter && (
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    onPress={onConfirm}
                                    isLoading={isLoadingConfirm}
                                >
                                    {textConfirm}
                                </Button>
                                <Button
                                    color="default"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    {textClose}
                                </Button>
                            </ModalFooter>
                        )}
                    </>
                )}
            </ModalContent>
        </ModalComponent>
    );
};
