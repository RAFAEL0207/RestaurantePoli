"use server"
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs";
import { revalidatePath } from "next/cache";




export async function createProduct(product: Prisma.ProductsCreateWithoutCategoryInput) {

    try {

        await prisma.products.create({
            data: product
        })


        revalidatePath('/admin/inventory/products')

        return {
            error: null,
            data: "Producto creado"
        }



    } catch (error) {
        console.log(error)
        return {
            error: "Revise los logs del sistema",
            data: null
        }
    }


}