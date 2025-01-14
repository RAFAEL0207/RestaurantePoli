'use client'
import { logout } from "@/modules/auth"
import { Button } from "@nextui-org/react"
import { Logout01Icon } from "hugeicons-react"



export const LogoutButton = () => {
    
    const handleClick = async () => {
        await logout();
    }

    return (
        <Button onPress={handleClick} fullWidth size='lg' color='danger' radius='lg' variant='light' endContent={<Logout01Icon />}>
            Cerrar Sesion
        </Button>
    )
}
