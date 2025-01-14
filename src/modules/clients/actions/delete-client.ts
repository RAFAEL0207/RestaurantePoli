"use server";

import { prisma } from "@/libs";
import { revalidatePath } from "next/cache";

export async function deleteClient(id: string) {

    console.log(id)

    try {
        await prisma.clients.delete({
            where: { id },
        })

        revalidatePath('/admin/clients')

        return {
            error: null,
            data: "Cliente eliminado con éxito"
        };
    } catch (error) {
        console.log("Error al eliminar el Cliente:", error);
        return {
            data: null,
            error: "Ocurrió un error al intentar eliminar el Cliente. Revise los logs del sistema."
        };
    }
}
