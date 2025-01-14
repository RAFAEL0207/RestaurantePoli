import { IProduct } from '@/modules/products'
import React from 'react'
import { MenuCard } from './MenuCard'


interface Props {
    products: IProduct[]
}

export const MenuGrid = ({ products }: Props) => {
    return (
        <ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
                products.map(product => (
                    <li key={product.id}>
                        <MenuCard product={product}/>
                    </li>
                ))
            }

        </ul>
    )
}
