"use server"

import { prisma } from "@/libs";

export const getOrders = async (page: number = 1, limit: number = 15) => {

    const totalOrders = await prisma.orders.count();
    const lastPage = Math.ceil(totalOrders / limit);

    const orders = await prisma.orders.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            updatedAt: "desc"
        },
        include: {
            client: {
                select: {
                    id: true,
                    name: true,
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                }
            },
        },
    })

    return {
        orders,
        meta: {
            total: totalOrders,
            page: page,
            lastPage: lastPage,
        }
    }

}