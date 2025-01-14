"use client"
import { Card, CardBody } from '@nextui-org/react'
import { ICategory } from '../../interfaces/category.interface'

interface Props {
    category: ICategory
}

export const ParentCategotyButton = ({ category }: Props) => {
    return (
        <Card isPressable className='max-w-[200px]'>
            <CardBody>
                <h3 className='text-lg font-semibold'>{ category.name }</h3>
                <p className='line-clamp-1 text-gray-500 text-sm'>
                    { category.description }
                </p>
            </CardBody>
        </Card>
    )
}
