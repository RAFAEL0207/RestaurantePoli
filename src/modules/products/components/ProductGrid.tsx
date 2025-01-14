import React from 'react'
import { IProduct } from '../interfaces/product.interface'
import { ProductCard } from './ProductCard';


interface Props {
    products: IProduct[];
}

export const ProductGrid = ({ products }: Props) => {
    return (
        <>
            <h2 className='text-2xl mb-4'>Listado de productos</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4'>
                {
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }

            </div>
        </>
    )
}
