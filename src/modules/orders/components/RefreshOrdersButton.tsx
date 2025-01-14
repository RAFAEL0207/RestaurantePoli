"use client"

import { Button } from '@nextui-org/react'
import { RefreshIcon } from 'hugeicons-react'
import { refreshOrders } from '../actions/refresh-orders'

export const RefreshOrdersButton = () => {



    return (
        <Button
            color='primary'
            variant='light'
            startContent={<RefreshIcon size={20}/> }

            onPress={refreshOrders}
        >
            Refrescar
        </Button>
    )
}
