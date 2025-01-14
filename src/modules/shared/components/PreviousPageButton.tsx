"use client"

import { Button } from '@nextui-org/react'
import { ArrowLeft01Icon } from 'hugeicons-react'
import { useRouter } from 'next/navigation'

export const PreviousPageButton = () => {

    const router = useRouter();

    return (
        <Button 
            variant='light' 
            color='primary'
            onPress={() => router.back()}
            startContent={<ArrowLeft01Icon size={18} />}
        >
            Vovler
        </Button>
    )
}
