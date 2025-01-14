import { prisma } from '@/libs';
import { UserRole } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcrypt';

export async function GET(request: Request) {


    await prisma.products.deleteMany();
    await prisma.categories.deleteMany();
    await prisma.users.deleteMany();

    // Categorías Padre
    const platos = await prisma.categories.create({
        data: {
            name: 'Platos',
            description: 'Categoría de platos principales',
            categoryParent: null,
        },
    });

    const bebidas = await prisma.categories.create({
        data: {
            name: 'Bebidas',
            description: 'Categoría de bebidas',
            categoryParent: null,
        },
    });

    // -------------------------------
    // Subcategorías para Platos
    // -------------------------------
    const subcategoriesPlatos = [
        { name: '1/2', parentId: platos.id },
        { name: 'Entero', parentId: platos.id },
    ];

    const platosSubcategories = [];
    for (const sub of subcategoriesPlatos) {
        const subcategory = await prisma.categories.create({
            data: {
                name: sub.name,
                description: `Subcategoría ${sub.name}`,
                categoryParent: {
                    id: sub.parentId,
                    name: 'Platos',
                },
            },
        });
        platosSubcategories.push(subcategory);
    }

    // -------------------------------
    // Subcategorías para Bebidas
    // -------------------------------
    const subcategoriesBebidas = [
        { name: 'Pequeña', parentId: bebidas.id },
        { name: 'Grande', parentId: bebidas.id },
        { name: 'Valde', parentId: bebidas.id },
    ];

    const bebidasSubcategories = [];
    for (const sub of subcategoriesBebidas) {
        const subcategory = await prisma.categories.create({
            data: {
                name: sub.name,
                description: `Subcategoría ${sub.name}`,
                categoryParent: {
                    id: sub.parentId,
                    name: 'Bebidas',
                },
            },
        });
        bebidasSubcategories.push(subcategory);
    }


    // -------------------------------
    // Productos para Platos
    // -------------------------------
    const productsPlatos = [
        { name: 'Pique', slug: 'pique', price: 60, categoryId: platosSubcategories[0].id }, // Subcategoría 1/2
        { name: 'Pique Entero', slug: 'pique-entero', price: 100, categoryId: platosSubcategories[1].id }, // Subcategoría Entero
        { name: 'Charque', slug: 'charque', price: 60, categoryId: platosSubcategories[0].id },
        { name: 'Charque Entero', slug: 'charque-entero', price: 100, categoryId: platosSubcategories[1].id },
    ];

    for (const product of productsPlatos) {
        await prisma.products.create({
            data: {
                ...product,
                image: null,
                stock: 50,
            },
        });
    }

    // -------------------------------
    // Productos para Bebidas
    // -------------------------------
    const productsBebidas = [
        { name: 'Chicha Pequeña', slug: 'chicha-pequena', price: 8, categoryId: bebidasSubcategories[0].id }, // Pequeña
        { name: 'Chicha Grande', slug: 'chicha-grande', price: 15, categoryId: bebidasSubcategories[1].id }, // Grande
        { name: 'Chicha Valde', slug: 'chicha-valde', price: 30, categoryId: bebidasSubcategories[2].id }, // Valde
        { name: 'Coca Cola 600ML', slug: 'coca-cola-600ml', price: 5, categoryId: bebidasSubcategories[0].id }, // Pequeña
        { name: 'Coca Cola 2L', slug: 'coca-cola-2l', price: 13, categoryId: bebidasSubcategories[1].id }, // Grande
    ];

    for (const product of productsBebidas) {
        await prisma.products.create({
            data: {
                ...product,
                image: null,
                stock: 100,
            },
        });
    }

    // Usuarios
    const users = [
        {
            name: 'Guido',
            lastName: 'Pinaya',
            email: 'pinaya.rodriguez@gmail.com',
            password: bcrypt.hashSync('123456', 10),
            image: '',
            role: UserRole.Admin,
        },
        {
            name: 'Lider',
            lastName: 'Garcia',
            email: 'lider.gomez@gmail.com',
            password: bcrypt.hashSync('123456', 10),
            image: '',
            role: UserRole.Cajero,
        },
        {
            name: 'Michael',
            lastName: 'Rojas',
            email: 'michaelrojas@gmail.com',
            password: bcrypt.hashSync('123456', 10),
            image: '',
            role: UserRole.Cocina,
        },
        {
            name: 'Rafael',
            lastName: 'Escobar',
            email: 'Rafaeldeymar01@gmail.com',
            password: bcrypt.hashSync('123456', 10),
            image: '',
            role: UserRole.Mesero,
        },
    ];

    await prisma.users.createMany({
        data: users
    })

    return new Response(JSON.stringify({
        message: 'Seeder ejecutado con exito'
    }), { status: 200 });
}