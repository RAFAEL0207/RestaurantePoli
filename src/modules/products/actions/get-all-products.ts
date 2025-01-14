'use server'

import { prisma } from "@/libs"
import { IProduct } from "../interfaces/product.interface";



export async function getAllProducts( ) {

    try {
        const products = await prisma.products.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            }
        });

        return {
            data: products as IProduct[],
            error: null,
        }

    } catch (error) {
        console.log(error)
        return {
            error: "Revise los logs del sistema",
            data: null
        }
    }   
}