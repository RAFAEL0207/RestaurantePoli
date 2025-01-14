"use client"

import { Button } from '@nextui-org/react'
import { PrinterIcon } from 'hugeicons-react'


interface Props {
    orderId: string;
}

export const CreateOrderReportButton = ({ orderId }: Props) => {


    const handleClick = () => {
        window.open(`/admin/orders/reports/order/${orderId}`, '_blank');
    }

    return (
        <Button
            startContent={<PrinterIcon size={20} />}
            isIconOnly
            size='sm'
            onPress={handleClick}
            variant='light'
            color='primary'
        />
    )
}
