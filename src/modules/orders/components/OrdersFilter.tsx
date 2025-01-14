"use client"

import { Button } from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation';

export const OrdersFilter = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const status = searchParams.get('status'); // Puede ser null si no hay parámetro

    const handleClick = (status: 'PENDING' | 'COMPLETED' | 'CANCELED') => {
        router.push(`/admin/orders?status=${status}`);
    }

    return (
        <div className='flex flex-col md:flex-row gap-2'>
            <Button
                radius='full'
                variant={ status == 'PENDING' || null ? 'solid' : 'flat' }
                className={ status == 'PENDING' || null ? 'btn-primary' : '' }
                onPress={() => handleClick('PENDING')}
            >
                Pendientes
            </Button>

            <Button
                radius='full'
                variant={ status == 'COMPLETED' || null ? 'solid' : 'flat' }
                className={ status == 'COMPLETED' || null ? 'btn-primary' : '' }
                onPress={() => handleClick('COMPLETED')}
            >
                Completados
            </Button>

            <Button
                radius='full'
                variant={ status == 'CANCELED' || null ? 'solid' : 'flat' }
                className={ status == 'CANCELED' || null ? 'btn-primary' : '' }
                onPress={() => handleClick('CANCELED')}
            >
                Cancelados
            </Button>

        </div>
    )
}
