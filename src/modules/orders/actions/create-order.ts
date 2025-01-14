"use server"

import { prisma } from "@/libs"
import type { CreateOrderOptions } from "../interfaces/create-order-options.interface";
import { revalidatePath } from "next/cache";


export const createOrder = async (order: CreateOrderOptions) => {

    const { orderDetails, ...restOrder } = order;


    const orderProducts = orderDetails.map(item => {
        return {
            productId: item.id,
            productName: item.name,
            productPrice: +item.price,
            quantity: item.quantity,
            subTotal: +item.price * item.quantity,
        }
    })


    try {

        // VALIDAR Y ACTUALIZAR STOCK DE PRODUCTOS
        for (const product of orderDetails) {
            const productDB = await prisma.products.findUnique({
                where: {
                    id: product.id
                }
            })

            if (productDB!.stock < product.quantity) {
                return {
                    data: null,
                    error: `No hay suficiente stock para el producto ${product.name}`
                }
            }

            await prisma.products.update({
                where: {
                    id: product.id
                },
                data: {
                    stock: productDB!.stock - product.quantity
                }
            })

        }

        // TODO!: OBTENER EL USUARIO QUE ESTA LOGUEADO
        const user = await prisma.users.findFirst();

        // CREACION DE LA ORDEN
        const orderResponse = await prisma.orders.create({
            data: {
                ...restOrder,
                userId: user!.id,
                orderProducts
            },

        })

        revalidatePath('/admin/pos');
        revalidatePath('/admin/inventory/products');

        return {
            data: orderResponse,
            error: null
        }

    } catch (error) {
        console.log(error)
        return {
            data: null,
            error: "Error al crear la orden"
        }
    }


}