"use client"
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { IOrder } from '../interfaces/order.interface'
import { CreateOrderReportButton } from './CreateOrderReportButton'
import { formatDate } from '@/utils'
import { TablePaginationButtons } from '@/modules/shared/components/TablePaginationButtons'


interface Props {
    ordersResponse: {
        orders: IOrder[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        }

    }
}


export const OrderTable = ({ ordersResponse }: Props) => {

    const {orders, meta} = ordersResponse;

    return (
        <Table
            bottomContent={<TablePaginationButtons page={meta.page} lastPage={meta.lastPage} />}
            classNames={{
                th: ['bg-primary-soft'],
                wrapper: 'shadow-sm',
            }}
        >
            <TableHeader>
                <TableColumn>Cliente</TableColumn>
                <TableColumn>Tipo</TableColumn>
                <TableColumn>Mesa</TableColumn>
                <TableColumn>Total</TableColumn>
                <TableColumn>Estado</TableColumn>
                <TableColumn>C. Productos</TableColumn>
                <TableColumn>Creado</TableColumn>
                <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    orders.map(({client, user, ...order}) => (

                        <TableRow key={order.id}>
                            <TableCell>{client ? client.name : 'Cliente eliminado' }</TableCell>
                            <TableCell>
                                { order.type == "TABLE" ? "Mesa" : "Delivery" }
                            </TableCell>
                            <TableCell>
                                { order.table! > 0 ? order.table : "No aplica"}
                            </TableCell>
                            <TableCell>{order.total}Bs.</TableCell>
                            <TableCell>
                                <Chip
                                    size='sm'
                                    color={order.status === 'COMPLETED' ? 'success' : order.status == 'CANCELED' ? 'danger' : 'warning'}
                                    className='text-white mb-2'
                                >
                                    {order.status}
                                </Chip>
                            </TableCell>
                            <TableCell>{order.orderProducts.length}</TableCell>
                            <TableCell>{formatDate(order.createdAt)}</TableCell>
                            <TableCell>
                                <CreateOrderReportButton orderId={order.id} />
                            </TableCell>
                            
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
