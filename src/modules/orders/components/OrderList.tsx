"use client"

import React from 'react'
import { IOrder } from '../interfaces/order.interface'
import { OrderCard } from './OrderCard'
import { useSearchParams } from 'next/navigation'


interface Props {
    orders: IOrder[]
}

export const OrderList = ({ orders }: Props) => {

    const searchParams = useSearchParams();
    const activeOrderStatus = searchParams.get('status'); // Puede ser null si no hay parámetro

    let ordersFilter: IOrder[] = [];

    if( activeOrderStatus === null || activeOrderStatus === 'PENDING' ){
        ordersFilter = orders.filter((order) => order.status === 'PENDING')
    }

    if( activeOrderStatus === 'COMPLETED' ){
        ordersFilter = orders.filter((order) => order.status === 'COMPLETED')
    }
    
    if( activeOrderStatus === 'CANCELED' ){
        ordersFilter = orders.filter((order) => order.status === 'CANCELED')
    }


    return (
        <ul className='grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>

            {
                ordersFilter.length == 0 && (
                    <p>No hay ordenes disponibles</p>
                )
            }
            {
                ordersFilter.map(order => (

                    <li key={order.id}>
                        <OrderCard order={order}/>
                    </li>
                ))

            }
        </ul>
    )
}
