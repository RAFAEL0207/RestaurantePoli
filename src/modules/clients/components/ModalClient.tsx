import { formatDate } from "@/utils";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { EyeIcon } from "hugeicons-react";
import { IClient } from "../interfaces/clients.interface";

interface Props {
    client: IClient;
}

export const ModalClient = ({ client }: Props) => {

    const { isOpen, onOpenChange, onOpen } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} isIconOnly variant='light' radius='full' color='primary' startContent={<EyeIcon size={18} />} />

            <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="text-xl font-bold">Detalles del cliente</ModalHeader>
                            <ModalBody>
                                <p className='font-bold text-black'>Nombre: <span className='font-normal text-gray-500'>{client.name}</span></p>
                                <p className='font-bold text-black'>Ci: <span className='font-normal text-gray-500'>{client.ci}</span></p>
                                <p className='font-bold text-black'>Primer Apellido: <span className='font-normal text-gray-500'>{client.firstSurname}</span></p>
                                <p className='font-bold text-black'>Segundo Apellido: <span className='font-normal text-gray-500'>{client.secondSurname}</span></p>
                                <p className='font-bold text-black'>
                                    Fecha de creacion: <span className='font-normal text-gray-500'>{formatDate(client.createdAt)}</span>
                                </p>
                                <p className='font-bold text-black'>
                                    Ultima actualización: <span className='font-normal text-gray-500'>{formatDate(client.updatedAt)}</span>
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>

    )
}
