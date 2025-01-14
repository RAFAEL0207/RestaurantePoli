
import { Button } from '@nextui-org/react'
import { Add01Icon, Delete01Icon, MinusSignIcon } from 'hugeicons-react'
import React from 'react'
import { ICart, useCartStore } from '../store/cart.store';
import Image from 'next/image';
import NotImage from '@/assets/images/not-image.jpg';


interface Props {
    item: ICart;
}

export const CartItem = ({ item }: Props) => {

    const { incrementQuantity, decrementQuantity, removeProductToCart } = useCartStore();

    return (

        <div className='flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center'>
            <div className='flex items-center gap-2'>
                <Image
                    width="75"
                    height="75"
                    alt={item.name}
                    className="object-cover"
                    src={item.image || NotImage}
                />
                <div>
                    <h4 className='font-semibold text-xl'>{item.name}</h4>
                    <p className='text-gray-500'>${item.price}</p>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <Button
                    isIconOnly
                    startContent={<MinusSignIcon size={14} />}
                    radius='full'
                    size='sm'
                    onPress={() => decrementQuantity(item.id)}
                    variant='flat'
                />
                <p className='text-gray-600 font-semibold'>{item.quantity}</p>

                <Button
                    isIconOnly
                    onPress={() => incrementQuantity(item.id)}
                    startContent={<Add01Icon size={14} />}
                    radius='full'
                    size='sm'
                    variant='flat'
                />

                <Button
                    isIconOnly
                    onPress={() => removeProductToCart(item.id)}
                    startContent={<Delete01Icon size={14} />}
                    radius='full'
                    size='sm'
                    color='danger'
                />
            </div>
        </div>
    )
}
