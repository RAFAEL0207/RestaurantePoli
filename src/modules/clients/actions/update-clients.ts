"use server"

import { prisma } from "@/libs";
import { revalidatePath } from "next/cache";


interface UpdateClientOptions {
    id: string;
    ci: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
}

export const updateClients = async (client: UpdateClientOptions) => {
    
    const { id, ...updateClient } = client;

    try {

        await prisma.clients.update({
            where: { id },
            data: updateClient
        })


        revalidatePath('/admin/clientes/clients')

        return {
            isError: false,
            message: "Cliente actualizado"
        }

    } catch (error) {
        console.log(error)
        return {
            isError: true,
            message: "Revise los logs del sistema"
        }
    }
}