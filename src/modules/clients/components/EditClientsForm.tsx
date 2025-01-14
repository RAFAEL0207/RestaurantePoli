'use client'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { Button, Input } from '@nextui-org/react';

import { updateClients } from '..';
import { IClient } from '../interfaces/clients.interface';


interface Props {
    client: IClient;
}

export const EditClientsForm = ({ client }: Props) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const name = form.elements.namedItem('name') as HTMLInputElement;
        const ci = form.elements.namedItem('ci')  as HTMLInputElement;
        const lastname = form.elements.namedItem('firstSurname')  as HTMLInputElement;
        const secondlastname = form.elements.namedItem('secondSurname')  as HTMLInputElement;


        const updateClientsData = {
            id: client.id,
            ci: ci.value, 
            name: name.value,
            firstSurname: lastname.value, 
            secondSurname: secondlastname.value, 
        }


        const { message, isError } = await updateClients(updateClientsData);

        if (isError) {
            toast.error('Ocurrio un error', {
                description: message,
            });

            setIsLoading(false);

            return;
        }

        toast.success('Cliente creado', {
            description: message
        });

        setIsLoading(false);

        router.push('/admin/clientes/clients');
    }

    return (
        <section className='mb-8'>
            <form noValidate onSubmit={handleSubmit} className='product__form'>
                <h2 className='mb-4'>Editar detalles del empleado</h2>
                <div className='flex flex-col gap-5 mb-4'>
                    <Input
                        name='name'
                        defaultValue={client.name}
                        isRequired
                        variant='bordered'
                        placeholder='Nombre del producto'
                        labelPlacement='outside'
                        label="Nombre:"
                    />


                    <Input
                        name='ci'
                        isRequired
                        variant='bordered'
                        defaultValue={`${client.ci}`}
                        labelPlacement='outside'
                        type='number'
                        label="Documento de identidad:"
                        placeholder='ci'

                    />


                    <Input
                        name='firstSurname'
                        isRequired
                        defaultValue={client.firstSurname}
                        variant='bordered'
                        labelPlacement='outside'
                        label="Estado actual:"
                        placeholder='estado'
                    />
                    
                    <Input
                        name='secondSurname'
                        isRequired
                        defaultValue={client.secondSurname || ''}
                        variant='bordered'
                        labelPlacement='outside'
                        label="Estado actual:"
                        placeholder='estado'
                    />

                </div>
                <Button isLoading={isLoading} isDisabled={isLoading} type="submit" className='btn-primary mt-8'>Guardar cliente</Button>
            </form>
        </section>
    )
}
