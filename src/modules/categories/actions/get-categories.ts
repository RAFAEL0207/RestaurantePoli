'use server'

import { prisma } from "@/libs";
import { ICategory } from "../interfaces/category.interface";


export async function getCategories() {
    try {
        const categories = await prisma.categories.findMany({
            orderBy: {
                updatedAt: 'desc'
            }
        })
        console.log(categories)

        return {
            data: categories as ICategory[],
            error: null
        }


    } catch (error) {
        console.log(error)
        return {
            data: null,
            error: error
        };
    }


}