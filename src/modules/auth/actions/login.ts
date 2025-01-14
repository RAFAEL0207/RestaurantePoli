'use server'

import { prisma } from "@/libs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


export const loginUser = async (email: string, password: string) => {

    const cookiesStore = await cookies()

    // Buscar usuario
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
        return {
            error: 'Usuario o contraseña incorrectos.',
            data: null
        }
    }


    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return { error: 'Usuario o contraseña incorrectos.' }
    }

    // Generar token JWT
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    );

    const userLogued = await prisma.users.update({
        where: { id: user.id },
        data: {
            token: token
        }
    })

    cookiesStore.set('POLI_USER', JSON.stringify(userLogued))
    cookiesStore.set('POLI_TOKEN', token)

    revalidatePath('/auth/login');

    return {
        error: null,
        data: `Bienvenido usuario`,
    }
}