'use server';

import { cookies } from "next/headers";
import { IUser } from "../interfaces/user";


export const getSession = async () => {

    const cookiesStore = await cookies();
    const user = JSON.parse(cookiesStore.get('POLI_USER')?.value as string) as IUser;
    return user;

}