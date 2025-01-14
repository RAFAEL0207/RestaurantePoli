"use server"

import { prisma } from "@/libs"
import { revalidatePath } from "next/cache"



export const deleteUser = async (id: string) => {

    try {

        await prisma.users.delete({
            where: { id }
        })

        revalidatePath('/admin/users');
        
        return {
            data: "Usuario eliminado del sistema",
            error: null
        }

        
    } catch (error) {
        return {
            data: null,
            error: "Error: Revisar los LOGS del sistema"
        }
    }

}