
import { Button, Card, Chip, Divider } from '@nextui-org/react'
import { CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { IOrder } from '../interfaces/order.interface';
import { changeOrderStatus } from '../actions/change-order-status';


interface Props {
    order: IOrder
}

export const OrderCard = ({ order }: Props) => {

    const { client, orderProducts } = order;

    return (
        <Card
            isPressable
            className='p-6'
            fullWidth
        >
            <CardHeader className='flex flex-col items-start text-start'>
                <Chip
                    size='sm'
                    color={ order.status === 'COMPLETED' ? 'success' : order.status == 'CANCELED' ? 'danger' : 'warning' }
                    className='text-white mb-2'
                >
                    { order.status }
                </Chip>
                <h2>
                    Cliente: <br />
                    <span className='font-medium text-base'>
                    {client ? client.name : 'Cliente eliminado' }
                    </span>
                </h2>

                <h2>
                    Mesa: <br />
                    <span className='font-medium text-base'>{order.table}</span>
                </h2>

            </CardHeader>
            <CardBody>
                <h3 className='text-xl mb-4 font-bold'>Productos ordenados:</h3>
                <ul className='flex flex-col gap-4'>
                    {
                        orderProducts.map(product => (

                            <div key={product.productId}>
                                <p>
                                    <span className='font-bold'>
                                        {`Cantidad: (${product.quantity}u.) `}
                                    </span>
                                    {product.productName}
                                </p>

                                <p>
                                    <span className='font-bold'>
                                        SubTotal:
                                    </span>
                                    {` ${product.subTotal}`}Bs.
                                </p>
                                <Divider />
                            </div>
                        ))
                    }
                </ul>

                <p className='text-lg pt-4'>
                    <span className='font-extrabold'>
                        {`Total a pagar: `}

                    </span>
                    {order.total}Bs.
                </p>
            </CardBody>
            {
                order.status === 'PENDING' && (
                    <CardFooter className='flex justify-between'>
                        <Button
                            as='div'
                            color='primary'
                            className='btn-primary'
                            onPress={() => changeOrderStatus(order.id, 'COMPLETED')}
                        >
                            Completado
                        </Button>
                        <Button
                            as='div'
                            color='danger'
                            onPress={() => changeOrderStatus(order.id, 'CANCELED')}
                        >
                            Cancelado
                        </Button>
                    </CardFooter>
                )
            }
        </Card>
    )
}
