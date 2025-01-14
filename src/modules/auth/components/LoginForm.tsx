'use client'
import { FormEvent, useState } from 'react'
import { loginUser } from '../actions/login'


import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Form } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const LoginForm = () => {

    const inputWrapper = 'text-border-white/20 border-[2px] shadow-none'

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        setIsLoading(true);

        const { email, password } = e.target as HTMLFormElement;

        const { error } = await loginUser(email.value, password.value);

        if(error){
            toast.error(error);
            setIsLoading(false);
            return;
        }

        router.push('/admin/orders')

        setIsLoading(false);
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className='grid gap-8'>
                <Input
                    name='email'
                    type='email'
                    label="Correo electrónico"
                    placeholder='correo@example.com'
                    variant='bordered'
                    labelPlacement='outside'
                    size='lg'
                    classNames={{ inputWrapper }}
                />

                <Input
                    name='password'
                    label="Contraseña"
                    placeholder='Ingresa tu contraseña'
                    variant='bordered'
                    labelPlacement='outside'
                    type='password'
                    size='lg'
                    classNames={{ inputWrapper }}

                />

                <Button isLoading={isLoading} disabled={isLoading} type='submit' fullWidth size='lg' className='btn-primary'>Iniciar Sesion</Button>
            </Form>
        </>
    )
}
