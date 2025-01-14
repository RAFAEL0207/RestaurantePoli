"use server"

import { prisma } from "@/libs"
import { IUser } from "../interfaces/user.interface"


export const getUsers = async () => {
    try {
        
        const users = await prisma.users.findMany({
            orderBy: {
                updatedAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                image: true,
                role: true,
                token: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return {
            data: users as IUser[],
            error: null
        }


    } catch (error) {
        throw error;
        
    }
}