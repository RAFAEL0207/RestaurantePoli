"use server"

import { prisma } from "@/libs"
import { IProduct } from "../interfaces/product.interface"



export const getProductById = async (id: string) => {

    try {
        const product = await prisma.products.findUnique({
            where: { id: id },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        if( !product ){
            return {
                data: null,
                error: "No se encontro el producto"
            }
        }
    
        return {
            data: product as IProduct,
            error: null
        }
        
    } catch (error) {
        console.log(error)
        return {
            data: null,
            error: "No es un id valido"
        }
    }




}