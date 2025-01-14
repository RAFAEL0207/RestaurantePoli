import { ICart } from "@/modules/cart/store/cart.store";

export interface CreateOrderOptions {
    total: number;
    table: number;
    userId: string;
    clientId: string;
    type: "TABLE" | "DELIVERY";
    status: "PENDING" | "COMPLETED" | "CANCELED";
    orderDetails: ICart[]
}