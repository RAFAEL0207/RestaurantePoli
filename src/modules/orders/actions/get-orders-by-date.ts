"use server"

import { prisma } from "@/libs";
import { IOrder } from "../interfaces/order.interface";


// Función para obtener órdenes filtradas por rango de tiempo
export const getOrdersByDateRange = async (filter: 'day' | 'week' | 'month' = "day"): Promise<IOrder[]> => {
    // Obtener la fecha actual
    const today = new Date();

    // Inicializar el rango de fechas
    let startDate: Date;
    let endDate: Date;

    // Determinar el rango de tiempo según el filtro
    switch (filter) {
        case 'day':
            // Día actual (00:00:00 - 23:59:59)
            startDate = new Date(today.setHours(0, 0, 0, 0)); // Inicio del día
            endDate = new Date(today.setHours(23, 59, 59, 999)); // Fin del día
            break;

        case 'week':
            // Inicio y fin de la semana
            const firstDayOfWeek = new Date(today); // Clonar la fecha actual
            firstDayOfWeek.setDate(today.getDate() - today.getDay()); // Ir al domingo
            firstDayOfWeek.setHours(0, 0, 0, 0);

            const lastDayOfWeek = new Date(firstDayOfWeek); // Clonar el primer día
            lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Ir al sábado
            lastDayOfWeek.setHours(23, 59, 59, 999);

            startDate = firstDayOfWeek;
            endDate = lastDayOfWeek;
            break;

        case 'month':
            // Inicio y fin del mes
            startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Primer día del mes
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999); // Último día del mes
            break;

        default:
            throw new Error('Filtro no válido. Usa "day", "week" o "month".');
    }

    // Consultar las órdenes dentro del rango especificado
    const orders = await prisma.orders.findMany({
        where: {
            createdAt: {
                gte: startDate, // Fecha de inicio
                lte: endDate,   // Fecha de finalización (notar el cambio a 'lte')
            },
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
        orderBy: {
            createdAt: 'desc', // Ordenar por fecha descendente
        },
    });

    return orders;
};