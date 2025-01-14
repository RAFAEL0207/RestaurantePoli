"use server";
import { prisma } from "@/libs";

export async function deleteProduct(id: string) {

    try {

        const product = await prisma.products.delete({
            where: { id }
        })

        if (!product) {
            return {
                error: true,
                data: "Producto no encontrado"
            };
        }

        return {
            error: false,
            data: "Producto eliminado con éxito"
        };

    } catch (error) {
        console.log("Error al eliminar el producto:", error);
        return {
            error: "Ocurrió un error al intentar eliminar el producto. Revise los logs del sistema.",
            data: null
        };
    }
}
