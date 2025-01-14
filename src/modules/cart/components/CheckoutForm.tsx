"use client"
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useSearchClient } from '../hooks/useSearchClient';
import { useNewOrder } from '@/modules/orders/hooks/useNewOrder';
import Link from 'next/link';

export const CheckoutForm = () => {

    const { client, isLoading, searchClient, onChangeCI, error } = useSearchClient();

    const { handleSubmit, isLoading: isLoadingOrder } = useNewOrder();


    return (
        <form onSubmit={handleSubmit} className='bg-white pt-8 px-8 pb-8 rounded-lg flex flex-col gap-4'>
            <h2 className='text-lg font-bold'>Buscar Cliente</h2>
            <div className='flex flex-col gap-4'>

                <div className='flex gap-4 items-center'>
                    <Input
                        name='ci'
                        variant='bordered'
                        labelPlacement='outside'
                        isRequired
                        onChange={onChangeCI}
                        label="NIT del cliente"
                        placeholder='10010100'
                    />
                    <Button
                        isLoading={isLoading}
                        type="submit"
                        className='btn-primary'
                        onPress={searchClient}
                    >
                        Buscar
                    </Button>
                </div>

                {
                    error && (
                        <Link href='/admin/clients/new' className='text-primary-500'>+ Agregar cliente</Link>
                    )
                }

                <Input className='hidden' hidden name='clientId' value={client.id} />
                <Input
                    readOnly
                    label="Cliente"
                    placeholder='Nombre del cliente'
                    isRequired
                    variant='bordered'
                    labelPlacement='outside'
                    value={client.firstSurname}
                />
            </div>

            <Select
                label='Tipo de pedido'
                name='type'
                variant='bordered'
                labelPlacement='outside'
                isRequired
            >
                <SelectItem key={"TABLE"} value='TABLE'>Mesa</SelectItem>
                <SelectItem  key={"DELIVERY"} value='DELIVERY'>Domicilio</SelectItem>
            </Select>

            <Input
                label="Mesa del cliente"
                name='table'
                type='number'
                min={0}
                variant='bordered'
                labelPlacement='outside'
                placeholder='Asigne una mesa de entrega'
            />

            <Button 
                type='submit'
                isLoading={isLoadingOrder}
                isDisabled={isLoadingOrder}
                className='btn-primary'
            >
                Confirmar Pedido
            </Button>
        </form>

    )
}
