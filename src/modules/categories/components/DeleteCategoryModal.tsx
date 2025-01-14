'use client'

import { Delete01Icon } from "hugeicons-react";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface Props {
    categoryName: string;
    categoryId: string;
}

export const DeleteCategoryModal = ({ categoryName, categoryId }: Props) => {
    
    const { isOpen, onOpenChange, onOpen } = useDisclosure();

    const { handleSubmit, isLoading } = useDeleteCategory(categoryId);

    return (
        <>
            <Button onPress={onOpen} isIconOnly variant='light' radius='full' color='danger' startContent={<Delete01Icon size={18} />} />

            <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar categoria</ModalHeader>
                            <ModalBody>
                                <p>
                                    ¿Esta seguro de eliminar la categoria <span className="text-black font-semibold">{categoryName}</span>? <br />
                                    Se <span className="text-red-500">eliminaran</span> todos los productos de la categoria.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button 
                                    isLoading={isLoading} 
                                    disabled={isLoading} 
                                    onPress={async () => {
                                        await handleSubmit();
                                        onClose();
                                    }}
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
