import { $Enums } from "@prisma/client";

export interface IUser {
    id: string;
    name: string;
    lastName: string;
    email: string;
    image: string;
    role: UserRole;
    token: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type UserRole = $Enums.UserRole;