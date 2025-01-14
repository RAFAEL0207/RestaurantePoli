import Image from "next/image";
import NotImage from "@/assets/images/not-image.jpg";

import { IProduct } from "..";
import { formatDate } from "@/utils";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { EyeIcon } from "hugeicons-react";

interface Props {
    product: IProduct;
}

export const ModalProduct = ({ product }: Props) => {

    const { isOpen, onOpenChange, onOpen } = useDisclosure();

    return (
        <>
            <Button onPress={ onOpen } isIconOnly variant='light' radius='full' color='primary' startContent={<EyeIcon size={18} />} />

            <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1">{product.name}</ModalHeader>
                            <ModalBody>
                                <Image
                                    width="150"
                                    height="150"
                                    alt={product.name}
                                    className="max-w-[350px] mx-auto w-full object-cover"
                                    src={ product.image ? product.image : NotImage }
                                />
                                <p className='font-bold text-black'>Nombre: <span className='font-normal text-gray-500'>{product.name}</span></p>
                                <p className='font-bold text-black'>Precio: <span className='font-normal text-gray-500'>{product.price}</span></p>
                                <p className='font-bold text-black'>
                                    Fecha de creacion: <span className='font-normal text-gray-500'>{formatDate(product.createdAt)}</span>
                                </p>
                                <p className='font-bold text-black'>
                                    Ultima actualización: <span className='font-normal text-gray-500'>{formatDate(product.updatedAt)}</span>
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
