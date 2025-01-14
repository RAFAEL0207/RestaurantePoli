"use server"

import { prisma } from "@/libs";
import { IClient } from "../interfaces/clients.interface";



export const getClientByCI = async (ci: string) => {
    try {


        
        const client = await prisma.clients.findFirst({
            where: { ci }
        })

        if( !client ){
            return {
                error: "No se encontro el cliente",
                data: null
            }
        }

        return {
            data: client as IClient,
            error: null
        }

    } catch (error) {
        console.log(error)
        return {
            data: null,
            error: "No se encontro el cliente"
        }
    }

}