"use server"

import { prisma } from "@/libs";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { revalidatePath } from "next/cache";


export const registerNewUser = async (user: Prisma.UsersCreateInput) => {
    try {
        
        await prisma.users.create({
            data: {
                ...user,
                password: hashSync(user.password, 10)
            }
        })

        revalidatePath('/admin/users')

        return {
            data: 'Usuario creado correctamente',
            error: null
        }

    } catch (error) {
        console.error(error);
        return {
            data: null,
            error: 'Error al crear usuario'
        }
    }
}