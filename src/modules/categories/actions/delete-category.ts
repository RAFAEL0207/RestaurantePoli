"use server";

import { prisma } from "@/libs";
import { revalidatePath } from "next/cache";

export async function deleteCategory(id: string) {
    try {

        const category = await prisma.categories.delete({
            where: { id }
        })

        if (!category) {
            return {
                error: "Categoria no encontrada",
                data: null
            };
        }

        revalidatePath('/admin/inventory/categories');

        return {
            error: false,
            data: "Categoria eliminada con éxito"
        };

    } catch (error) {
        console.log("Error al eliminar la Categoria:", error);
        return {
            data: null,
            error: "Ocurrió un error al intentar eliminar la categoria. Revise los logs del sistema."
        };
    }
}
