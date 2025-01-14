"use client"
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, useDisclosure, Badge } from "@nextui-org/react";
import { ShoppingCart01Icon } from "hugeicons-react";
import { useCartStore } from "../store/cart.store";
import { CartItem } from "./CartItem";
import { useRouter } from "next/navigation";

export const CartDrawer = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { cart, total} = useCartStore();
    const router = useRouter();

    const handleRedirectToCheckout = () => {
        router.push('/admin/pos/checkout');
        onClose()
    }

    return (
        <>
            <Badge color="primary" size="lg" style={{ fontSize: '12px' }} content={cart.length}>
                <Button
                    onPress={onOpen}
                    isIconOnly
                    startContent={<ShoppingCart01Icon size={20} />}
                    color="primary"
                    variant="light"
                    radius="full"
                />

            </Badge>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="font-bold text-xl">Detalles de la orden</DrawerHeader>
                            <DrawerBody>
                                <ul className='space-y-4'>
                                    {
                                        cart.map(item => (
                                            <li key={item.id} >
                                                <CartItem item={item} />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </DrawerBody>
                            <DrawerFooter className="flex-col gap-2">
                                <p>total compra: {total}</p>        
                                <Button fullWidth className="btn-primary" onPress={handleRedirectToCheckout} color='primary'>Confirmar Orden</Button>

                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    )
}
