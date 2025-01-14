'use server'
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


export async function logout() {
    const cookiesStore = await cookies()

    cookiesStore.delete('POLI_USER')
    cookiesStore.delete('POLI_TOKEN')

    revalidatePath('/')
    
    redirect('/auth/login')
}