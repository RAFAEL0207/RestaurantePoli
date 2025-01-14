'use server'

import { revalidatePath } from "next/cache";
import { prisma } from '../../../libs/prisma';
import { Prisma } from "@prisma/client";

export async function createCategory(category: Prisma.CategoriesCreateInput) {
    const { name, description, categoryParent } = category;
    
    // Validar si categoryParent.id está vacío o no existe
    const parentCategory = categoryParent!.id ? categoryParent : null;

    try {

        await prisma.categories.create({
            data: {
                name,
                description,
                categoryParent: parentCategory,
            },
        });

        revalidatePath('/admin/inventory/categories')

        return {
            error: null,
            message: "Categoria registrada"
        }
    } catch (error) {
        console.log(error)
        return {
            error: true,
            message: "Ocurrio un error al registrar la categoria"
        }
    }



}