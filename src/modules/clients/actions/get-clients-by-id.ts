"use server"

import { prisma } from "@/libs";
import { isValidObjectId } from "mongoose"
import { IClient } from "../interfaces/clients.interface";



export const getClientsById = async (id: string) => {

    if( !isValidObjectId(id) ){
        return {
            data: null,
            error: "No es un id valido"
        }
    };

    try {
        const client = await prisma.clients.findFirst({
            where: {id}
        }) as IClient;
    
        return {
            data: client,
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