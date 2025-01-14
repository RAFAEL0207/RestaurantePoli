"use client"
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import type { ICategory } from '../interfaces/category.interface'
import type { ICategoryWithSubcategories } from '../interfaces/category-with-subcategories.interface'

import { Button } from '@nextui-org/react'

interface Props {
    categories: ICategoryWithSubcategories[]
}

export const CategoriesFilter = ({ categories }: Props) => {

    const router = useRouter();
    const searchParams = useSearchParams(); // Obtener parámetros de la URL

    // Obtener el parámetro 'category' de la URL
    const activeCategoryId = searchParams.get('category'); // Puede ser null si no hay parámetro

    // Estados para las subcategorías y categorías activas
    const [subCategories, setSubCategories] = useState<ICategory[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>(activeCategoryId || '');
    const [activeParentCategory, setActiveParentCategory] = useState<string | null>(null);

    // Efecto para sincronizar la categoría activa desde la URL
    useEffect(() => {
        setActiveCategory(activeCategoryId || ''); // Actualiza la categoría activa basada en la URL

        // Buscar si la categoría activa pertenece a una subcategoría
        const parent = categories.find(category =>
            category.subcategories.some(sub => sub.id === activeCategoryId)
        );

        if (parent) {
            // Actualizar el padre activo y sus subcategorías
            setActiveParentCategory(parent.id);
            setSubCategories(parent.subcategories);
        } else {
            // Si no hay categoría en la URL, deseleccionar padre y subcategorías
            setActiveParentCategory(null);
            setSubCategories([]);
        }

    }, [activeCategoryId, categories]);

    // Manejar clic en categoría padre
    const handleParentCategoryClick = (category: ICategoryWithSubcategories) => {
        setSubCategories(category.subcategories);
        setActiveParentCategory(category.id); // Actualizar categoría padre activa
        setActiveCategory(''); // Limpiar subcategoría activa
    }

    // Manejar clic en subcategoría
    const handleSubCategoryClick = (subCategory: ICategory | null) => {
        if (!subCategory) {
            router.push('/admin/pos'); // Para "Todos los productos"
            setActiveParentCategory(null); // Deseleccionar categoría padre
            setActiveCategory(''); // Limpiar categoría activa
            return;
        }

        router.push(`/admin/pos?category=${subCategory.id}`);
    }

    return (
        <div className='space-y-4'>

            <h2 className='text-2xl font-bold'>Categories</h2>
            <ul className='flex flex-row gap-4 w-full'>

                {/* Botón: Todos los productos */}
                <Button
                    as="li"
                    size='lg'
                    className={!activeCategory && !activeParentCategory ? 'btn-primary' : ''} // Resaltar solo si no hay nada seleccionado
                    variant={!activeCategory && !activeParentCategory ? 'solid' : 'flat'} // Resaltar solo si no hay nada seleccionado
                    color={!activeCategory && !activeParentCategory ? 'primary' : 'default'}
                    onPress={() => handleSubCategoryClick(null)}
                >
                    Todos los productos
                </Button>

                {/* Botones: Categorías padres */}
                {
                    categories.map(category => (
                        <Button
                            key={category.id}
                            as="li"
                            className={activeParentCategory === category.id ? 'btn-primary' : ''}
                            size='lg'
                            variant={activeParentCategory === category.id ? 'solid' : 'flat'} // Resaltar padre activo
                            color={activeParentCategory === category.id ? 'primary' : 'default'}
                            onPress={() => handleParentCategoryClick(category)}
                        >
                            {category.name}
                        </Button>
                    ))
                }
            </ul>

            {/* Botones: Subcategorías */}
            <ul className='flex flex-row gap-4 w-full'>
                {
                    subCategories.map(subCategory => (
                        <Button
                            key={subCategory.id}
                            as="li"
                            size='lg'
                            radius='full'
                            className={activeCategory === subCategory.id ? 'bg-primary-400' : ''}
                            variant={activeCategory === subCategory.id ? 'solid' : 'faded'} // Resaltar subcategoría activa
                            color={activeCategory === subCategory.id ? 'primary' : 'default'}
                            onPress={() => handleSubCategoryClick(subCategory)}
                        >
                            {subCategory.name}
                        </Button>
                    ))
                }
            </ul>
        </div>
    )
}
