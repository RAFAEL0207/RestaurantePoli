"use server"
import { revalidatePath } from "next/cache";

import { prisma } from "@/libs";

export const updateCategory = async (id: string, name: string) => {
    try {

        await prisma.categories.update({
            where: { id },
            data: {
                name,
            }
        })

        revalidatePath('/admin/inventories/categories')

        return {
            error: false,
            data: "Categoria actualizado"
        }

    } catch (error) {
        console.log(error)
        return {
            data: null,
            error: "Revise los logs del sistema"
        }
    }
}