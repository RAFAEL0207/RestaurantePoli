"use client"
import { useRouter } from 'next/navigation';

import { useCartStore } from '../store/cart.store'

import { CartItem } from './CartItem';
import { Button } from '@nextui-org/react'

export const SideMenuCart = () => {

    const { cart } = useCartStore();
    const router = useRouter();

    return (
        <div className='sidemenu__cart'>
            <h3 className='font-semibold text-xl mb-6'>Carrito de compras</h3>

            <ul className='space-y-4'>
                {
                    cart.map(item => (
                        <li key={item.id} className='flex justify-between items-center'>
                            <CartItem item={item} />
                        </li>
                    ))
                }
            </ul>

            <div className="flex-1"></div>

            <div>
                <p>Total <span>100</span></p>
            </div>

            <Button onPress={() => router.push('/admin/pos/checkout')} color='primary'>Confirmar Orden</Button>

        </div>
    )
}
