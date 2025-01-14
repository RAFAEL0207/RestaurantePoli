"use server"

import { prisma } from "@/libs";
import { IProduct } from "../interfaces/product.interface";


export const getProductsByCategories = async ( categoryId: string | undefined ) => {

    let products;

    try {    
        
        if( categoryId ){
            products = await prisma.products.findMany({ 
                where: { categoryId } 
            });

            return {
                error: null,
                data: products as IProduct[],
            }
        }

        products = await prisma.products.findMany();

        return {
            error: null,
            data: products as IProduct[],
        }

    } catch (error) {
        console.log(error)
        return {
            data: [],
            error: "No se encontraron productos"
        };
    }

}