'use client'

import { IClient } from "../interfaces/clients.interface";
import { useDeleteClient } from "../hooks/useDeleteClient";

import { Delete01Icon } from "hugeicons-react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface Props {
    client: IClient
}


export const DeleteClientModal = ({ client }: Props) => {

    const { handleSubmit, isLoading } = useDeleteClient(client.id)

    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    return (
        <>
            <Button onPress={onOpen} variant='light' color='danger' isIconOnly startContent={<Delete01Icon size={18} />} />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar Cliente</ModalHeader>
                            <ModalBody>
                                <p>
                                    Estas seguro de eliminar el cliente {client.name}? <br />
                                    <span className="text-red-500 font-semibold">Todos sus datos se perderan.</span>
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
