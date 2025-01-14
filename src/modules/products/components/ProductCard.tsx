"use client"
import React from 'react'
import Image from 'next/image';
import NotImage from '@/assets/images/not-image.jpg';

import { toast } from 'sonner';
import { useCartStore } from '@/modules/cart';

import { IProduct } from '../interfaces/product.interface';
import { Card, CardBody } from '@nextui-org/react'



interface Props {
    product: IProduct;
}

export const ProductCard = ({ product }: Props) => {

    const { addProductToCart } = useCartStore();
    
    const handleClick = () => {
        
        if( product.stock === 0 ) {
            toast.error('No hay stock disponible para este producto');
            return;
        }

        addProductToCart(product);
    }

    return (
        <Card onPress={handleClick} isDisabled={product.stock === 0} isPressable>
            <CardBody>
                <Image
                    width="100"
                    height="100"
                    alt={product.name}
                    className="max-w-sm mx-auto w-full object-cover"
                    src={product.image || NotImage}
                />
                <div className='text-center'>
                    <p className='font-bold text-xl text-black'>{product.name}</p>
                    <p className='font-bold text-black'>Precio: <span className='font-normal text-gray-500'>{product.price}</span></p>
                    <p className='font-bold text-black'>Stock: <span className='font-normal text-gray-500'>{product.stock}</span></p>
                </div>

            </CardBody>
        </Card>
    )
}
