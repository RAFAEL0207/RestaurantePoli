import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient();


    const categoriesData: Prisma.CategoriesCreateInput[] = [
        {
            name: "Enteros",
            description: "Productos enteros",
            products: {
                createMany: {
                    data: [
                        {
                            name: "Producto 1",
                            price: 100,
                            stock: 10,
                            slug: "producto-1",
                        },
                        {
                            name: "Producto 2",
                            price: 200,
                            stock: 20,
                            slug: "producto-2",
                        },
                        {
                            name: "Producto 3",
                            price: 300,
                            stock: 30,
                            slug: "producto-3",
                        },
                        
                    ]
                }
            }
        }
    ]

    try {
        // Elimina todas las categorías
        await prisma.products.deleteMany();
        await prisma.categories.deleteMany();

        const productsCreated = categoriesData.map(async (category) => {
            await prisma.categories.create({ data: category });
        })

        await Promise.all(productsCreated);


        return NextResponse.json({
            message: "Seed categories completed successfully!",
        });
    } catch (error) {
        console.error(error); // Imprime el error exacto en consola
        return NextResponse.json({ error: "Failed to seed categories" }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Desconecta el cliente
    }
}
