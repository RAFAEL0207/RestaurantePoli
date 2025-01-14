"use client"

import { useState } from "react";
import { ICategory } from "..";

// import { toast } from "sonner";

// import { createCategory } from "../actions/create-category";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { Add01Icon } from "hugeicons-react";
import { createCategory } from "../actions/create-category";
import { toast } from "sonner";


interface Props {
    categoryParents: ICategory[]
}

export const NewCategoryModal = ({ categoryParents }: Props) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const name = form.elements.namedItem('name') as HTMLInputElement;
        const description = form.elements.namedItem('description') as HTMLInputElement;
        const categoryParent = form.elements.namedItem('parentCategory') as HTMLInputElement;

        const { error, message } = await createCategory({
            name: name.value,
            description: description.value,
            categoryParent: {
                id: categoryParent.value,
                name: categoryParents.find(category => category.id === categoryParent.value)?.name as string
            }
        });

        if (error) {
            toast.error('Ocurrio un error', {
                description: message,
            });

            setIsLoading(false);

            return;
        }

        onClose();

        toast.success('Categoria create', {
            description: 'Se creo la categoria ' + name.value
        });

        setIsLoading(false);

    }

    return (
        <>
            <Button color="primary" className="bg-gradient" startContent={<Add01Icon />} onPress={onOpen}>Crea una categoria</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1">Agregar categoria</ModalHeader>
                            <ModalBody>
                                <Input
                                    name="name"
                                    isRequired
                                    label="Nombre de la categoria"
                                />
                                <Textarea
                                    name="description"
                                    isRequired
                                    label="Descripción"
                                />

                                <Select
                                    label="Seleccione la categoria padre"
                                    name="parentCategory"
                                >
                                    {
                                        categoryParents.map(category => (
                                            <SelectItem value={category.id} key={category.id}>{category.name}</SelectItem>
                                        ))
                                    }
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button isLoading={isLoading} isDisabled={isLoading} className="btn-primary" type="submit">
                                    Guardar
                                </Button>

                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}