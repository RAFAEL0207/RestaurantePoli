import { $Enums } from "@prisma/client";

export interface IOrder {

    client: {
        id: string;
        name: string;
    } | null;
    user: {
        id: string;
        name: string;
    } | null;


    id: string;
    total: number;
    clientId: string | null;
    table: number | null;
    userId: string | null;
    type: $Enums.OrderType;
    status: $Enums.OrderStatus;
    orderProducts: IOrderProduct[];

    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderProduct {
    productId: string | null;
    productName: string;
    productPrice: number;
    subTotal: number;
    quantity: number;
}
