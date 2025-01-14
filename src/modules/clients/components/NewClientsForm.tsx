"use client"
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Form } from '@nextui-org/react';

import { useNewClientForm } from '../hooks/useNewClientForm';



export const NewClientsForm = () => {

    const { handleSubmit, isLoading } = useNewClientForm();

    return (
        <Form onSubmit={handleSubmit} className='new-client__form'>
            <h2>Detalles del Cliente</h2>
            <Input
                name='name'
                isRequired
                variant='bordered'
                placeholder='Nombre del Empleado'
                labelPlacement='outside'
                label="Nombre:"
            />
            <Input
                name='ci'
                isRequired
                variant='bordered'
                placeholder='Cedula de Identidad'
                labelPlacement='outside'
                type='number'
                label="NIT/CI"
            />

            <Input
                name='firstSurname'
                isRequired
                variant='bordered'
                placeholder='Apellido del Cliente'
                labelPlacement='outside'
                label="Razon Social/Apellido:"
            />

            <Input
                name='secondSurname'
                variant='bordered'
                placeholder='Apellido secundario'
                labelPlacement='outside'
                label="Segundo Apellido"
            />

            <Button isLoading={isLoading} isDisabled={isLoading} type="submit" className='btn-primary'>Guardar Cliente</Button>
        </Form>
    )
}
