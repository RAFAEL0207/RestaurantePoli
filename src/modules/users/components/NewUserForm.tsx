"use client"
import { Button, Form, Input, Select, SelectItem } from '@nextui-org/react'
import { useNewUserForm } from '../hooks/useNewUserForm'

export const NewUserForm = () => {

    const { handleSubmit, isLoading } = useNewUserForm();

    const roles = [
        { label: 'Administrador', value: "Admin" },
        { label: 'Cajero', value: "Cajero" },
        { label: 'Cocina', value: "Cocina" },
        { label: 'Mesero', value: "Mesero" }
    ]  

    return (
        <Form
            onSubmit={handleSubmit}
            className='new-user__form'
        >
            <div className='new-user__form--fields'>
                <Input
                    name="name"
                    isRequired
                    label="Nombres"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Nombre del usuario"
                />

                <Input
                    name="lastName"
                    isRequired
                    label="Apellidos"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Apellidos del usuario"
                />

                <Input
                    name="email"
                    isRequired
                    label="Correo electrónico"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Correo electrónico del usuario"

                />

                <Input
                    name="password"
                    isRequired
                    type='password'
                    label="Contraseña"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Contraseña del usuario"
                />

                <Input
                    name="confirmPassword"
                    type='password'
                    isRequired
                    label="Confirmar contraseña"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Confirma la contraseña del usuario"
                />

                <Input
                    name="image"
                    type="file"
                    label="Imagen de perfil"
                    variant="bordered"
                    labelPlacement="outside"
                />

                <Select
                    label="Rol de usuario"
                    isRequired
                    name="role"
                    defaultSelectedKeys={['Admin']}
                    variant='bordered'
                    labelPlacement='outside'
                    items={roles}
                >
                    {
                        (roles).map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                                {role.label}
                            </SelectItem>
                        ))
                    }
                </Select>
            </div>

            <Button
                type='submit'
                color='primary'
                className='btn-primary'
                isLoading={isLoading}
                isDisabled={isLoading}
            >
                Registrar Usuario
            </Button>

        </Form>
    )
}
