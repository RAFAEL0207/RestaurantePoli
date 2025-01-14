'use client'

import { IClient } from '../../interfaces/clients.interface';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { ModalClient } from '../ModalClient';
import { DeleteClientModal } from '../DeleteClientModal';

interface Props {
    clients: IClient[];
}

export const ClientsTable = ({ clients }: Props) => {
    return (
        <Table
            className='shadow-none'
            aria-label="Table for all products"
            classNames={{
                th: ['bg-primary-soft'],
                wrapper: 'shadow-sm',
            }}
            checkboxesProps={{
                classNames: {
                    wrapper: "shadow-none after:bg-black after:text-background text-background",
                },
            }}
        >
            <TableHeader>
                <TableColumn className='font-semibold text-sm'>Nombre</TableColumn>
                <TableColumn className='font-semibold text-sm'>ci</TableColumn>
                <TableColumn className='font-semibold text-sm'>Primer Apellido</TableColumn>
                <TableColumn className='font-semibold text-sm'>Segundo Apellido</TableColumn>
                <TableColumn className='font-semibold text-sm'>Acciones</TableColumn>

            </TableHeader>
            <TableBody
                emptyContent="No hay clientes registrados"
            >
                {
                    clients.map(client => (
                        <TableRow key={client.id}>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.ci}</TableCell>
                            <TableCell>{client.firstSurname}</TableCell>
                            <TableCell>{client.secondSurname}</TableCell>
                            <TableCell>
                                <ModalClient client={client} />
                                <DeleteClientModal client={client}/>
                            </TableCell>
                        </TableRow>

                    ))
                }
            </TableBody>
        </Table>

    )
}
