"use server"
import { revalidatePath } from 'next/cache';


export const refreshOrders = async () => {
    revalidatePath('/admin/orders')
}