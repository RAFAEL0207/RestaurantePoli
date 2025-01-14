"use server"

import { prisma } from "@/libs";
import { Prisma } from "@prisma/client";

export async function createClient(client: Prisma.ClientsCreateInput) {
    try {

        await prisma.clients.create({
            data: client
        })

        return {
            error: null,
            data: "Cliente creado"
        }
    } catch (error) {
        console.log(error)
        return {
            data: null,
            error: "Revise los logs del sistema"
        }
    }


}