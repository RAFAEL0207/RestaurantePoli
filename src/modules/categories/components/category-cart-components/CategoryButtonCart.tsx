import React from 'react'
import { Button } from '@nextui-org/react'
import { ICategory } from '../../interfaces/category.interface'

interface Props {
    category: ICategory;
}

export const CategoryButtonCart = ({ category }: Props) => {
    return (
        <Button className='btn-primary'>{ category.name }</Button>
    )
}
