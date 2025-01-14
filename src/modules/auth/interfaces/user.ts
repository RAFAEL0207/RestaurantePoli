export interface IUser {
    id:        string;
    name:      string;
    lastName:  string;
    email:     string;
    password:  string;
    image:     string;
    role:      IUserRole;
    token:     string;
    createdAt: Date;
    updatedAt: Date;
}


export type IUserRole =   "Admin" |"Cajero" | "Cocina" | "Mesero" 