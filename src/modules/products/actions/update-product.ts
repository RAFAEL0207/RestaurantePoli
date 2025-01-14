"use server"
import { revalidatePath } from "next/cache";
import { prisma } from "@/libs";


interface UpdateProductOptions {
    id: string;
    name: string;
    price: number;
    categoryId: string;
    stock: number;
}

export const updateProduct = async (product: UpdateProductOptions) => {

    try {
        const { id, ...restProduct } = product;

        await prisma.products.update({
            where: {
                id,
            },
            data: {
                ...restProduct
            }
        })


        revalidatePath('/admin/inventories/products')

        return {
            error: null,
            data: "Producto actualizado"
        }

    } catch (error) {
        console.log(error)
        return {
            error: "Ocurrio un error, revise los logs",
            data: null
        }
    }
}