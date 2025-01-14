"use client"
import Image from 'next/image';
import NotImage from '@/assets/images/not-image.jpg';

import { IUser } from '../interfaces/user.interface';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { DeleteUserModal } from './DeleteUserModal';


interface Props {
    users: IUser[];
}


export const UserTable = ({ users }: Props) => {
    return (
        <Table
            className='shadow-none'
            aria-label="Tabla para la gestion de ususarios"
            classNames={{
                th: ['bg-primary-soft'],
                wrapper: 'shadow-sm',
            }}
        >
            <TableHeader>
                <TableColumn className='font-semibold text-sm'>Imagen</TableColumn>
                <TableColumn className='font-semibold text-sm'>Nombre</TableColumn>
                <TableColumn className='font-semibold text-sm'>Apellido</TableColumn>
                <TableColumn className='font-semibold text-sm'>Correo</TableColumn>
                <TableColumn className='font-semibold text-sm'>Rol</TableColumn>
                <TableColumn className='font-semibold text-sm'>Acciones</TableColumn>
            </TableHeader>
            <TableBody
                emptyContent="No hay usuarios registrados"
            >
                {
                    users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Image
                                    alt={user.name}
                                    width={100}
                                    height={100}
                                    className='max-w-[50px]'
                                    src={user.image || NotImage}
                                />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <DeleteUserModal user={user} />
                            </TableCell>
                        </TableRow>

                    ))
                }
            </TableBody>
        </Table>
    )
}
