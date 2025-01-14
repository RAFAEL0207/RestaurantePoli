'use client'
import { useState } from "react";
import { ICategory } from "..";

import { toast } from "sonner";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { Edit01Icon } from "hugeicons-react";
import { updateCategory } from "../actions/update-category";


interface Props {
    category: ICategory;
}

export const EditCategoryModal = ({ category }: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setIsLoading(true);

        const { categoryName } = e.target as HTMLFormElement;


        const { data, error } = await updateCategory(category.id, categoryName.value);

        if (error) {
            toast.error('Ocurrio un error', {
                description: error,
            });

            setIsLoading(false);

            return;
        }

        onClose();

        toast.success(data);

        setIsLoading(false);
    }


    return (
        <>
            <Button onPress={onOpen} isIconOnly variant='light' radius='full' color='primary' startContent={<Edit01Icon size={18} />} />

            <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1">Editar categoria {category.name}</ModalHeader>
                            <ModalBody>

                                <Input
                                    name="categoryName"
                                    isRequired
                                    defaultValue={category.name}
                                    label="Nombre de la categoria"
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button isLoading={ isLoading } isDisabled={ isLoading } color="primary" type="submit">
                                    Actualizar
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
