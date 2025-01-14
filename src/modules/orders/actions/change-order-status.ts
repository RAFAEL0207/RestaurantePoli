"use server"

import { prisma } from "@/libs"
import { revalidatePath } from "next/cache"


export const changeOrderStatus = async (id: string,status: 'PENDING' | 'COMPLETED' | 'CANCELED') => {
 
    try {
        
        await prisma.orders.update({
            where: {id},
            data: {
                status
            }
        })

        revalidatePath('/admin/orders');
        revalidatePath('/admin/sales-report');

        return {
            error: null,
            data: "La orden cambio de estado"
        }

    } catch (error) {
        console.log(error)
        return {
            data: null,
            error: "No se pudo cambiar el estado de la orden"
        }
    }
    
}