'use server'

import { prisma } from "@/libs"

export async function getAllClients( ) {

    try {

        const clients = await prisma.clients.findMany()
        return {
            data: clients,        
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