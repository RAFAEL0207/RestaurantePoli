"use client"
import { IProduct } from '@/modules/products'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import Image from 'next/image';
import NotImage from '@/assets/images/not-image.jpg';


interface Props {
    product: IProduct;
}

export const MenuCard = ({ product }: Props) => {
    return (
        <Card
            isPressable
            radius='lg'
            fullWidth
            className=' border-gray-800 text-white border rounded-2xl'
            classNames={{
                base: 'bg-[#141414] hover:!bg-white hover:text-black'
            }}
        >
            <CardBody className="overflow-visible p-0">
                <Image
                    alt={product.name}
                    className="w-full object-cover h-[200px]"
                    width={300}
                    height={300}
                    src={product.image || NotImage}
                />
            </CardBody>
            <CardFooter className='flex-col py-8'>
                <h3 className='text-2xl italic font-extrabold'>{product.name}</h3>
                <p className='text-gray-400 '>Categoria: { product.category.name }</p>
                <p className='text-xl font-bold text-primary-500'>{ product.price }Bs</p>
            </CardFooter>
        </Card>
    )
}
