'use client'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Delete01Icon } from "hugeicons-react";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

interface Props {
    productName: string;
    productId: string;
}


export const DeleteProductModal = ({ productName, productId }: Props) => {
    const {isOpen, onOpen, onOpenChange } = useDisclosure();
    const { handleDeleteProduct, isLoading } = useDeleteProduct(productId);



    return (
        <>
            <Button onPress={ onOpen } variant='light' color='danger' isIconOnly startContent={ <Delete01Icon size={ 18 }/> } />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar Producto</ModalHeader>
                            <ModalBody>
                                <p>
                                <span className="text-red-500 font-semibold">Estas seguro de eliminar el producto </span> <span className="text-black font-semibold">{ productName }</span>?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button 
                                    isLoading={ isLoading } 
                                    isDisabled={ isLoading } 
                                    onPress={async () => {
                                        await handleDeleteProduct()
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
