'use client'
import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'


interface Props {

    text?: string; 

    onClose?: () => void
}

export function SubmitButton({ onClose, text = "Guardar" }: Props) {
    const { pending } = useFormStatus()

    return (
        <Button isLoading={pending} isDisabled={pending} className="bg-gradient" color="primary" type="submit">
            { text }
        </Button>
    )
}