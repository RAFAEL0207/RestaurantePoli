import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Delete01Icon } from "hugeicons-react";
import { IUser } from '../interfaces/user.interface';
import { useDeleteUser } from '../hooks/useDeleteUser';


interface Props {
    user: IUser
}


export const DeleteUserModal = ({ user }: Props) => {
    

    const {isOpen, onOpen, onOpenChange } = useDisclosure();
    const { handleSubmit, isLoading } = useDeleteUser(user.id);


    return (
        <>
            <Button onPress={onOpen} variant='light' color='danger' isIconOnly startContent={<Delete01Icon size={18} />} />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar Producto</ModalHeader>
                            <ModalBody>
                                <p>
                                    <span className="text-red-500 font-semibold">Estas seguro de eliminar al usuario </span> <span className="text-black font-semibold">{user.name}</span>?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    isLoading={isLoading}
                                    isDisabled={isLoading}
                                    onPress={async () => {
                                        await handleSubmit()
                                        onClose()
                                    }}
                                    className="btn-primary"
                                    color="primary"
                                >
                                    Eliminar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
