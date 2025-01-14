import { useCartStore } from "@/modules/cart"
import { FormEvent, useState } from "react";
import { createOrder } from "../actions/create-order";
import { CreateOrderOptions } from "../interfaces/create-order-options.interface";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const useNewOrder = () => {
    const router = useRouter();
    const { cart, total, cleanCart } = useCartStore();
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        
        const form = e.target as HTMLFormElement;
        
        const clientId = form.elements.namedItem('clientId') as HTMLInputElement;
        const table = form.elements.namedItem('table') as HTMLInputElement;
        const type = form.elements.namedItem('type') as HTMLInputElement;       

        const newOrder: CreateOrderOptions = {
            total,
            table: +table.value,
            userId: '67798545511a87d9fa8a1724',
            clientId: clientId.value,
            type: type.value as "TABLE" | "DELIVERY",
            status: 'PENDING',
            orderDetails: cart
        }
        
        const { data, error } = await createOrder(newOrder);
        
        if (error) {
            toast.error('Ocurrió un error', {
                description: error,
            });
            setIsLoading(false);
            return;
        }

        toast.success('Producto creado exitosamente');

        setIsLoading(false);
        form.reset();
        cleanCart();
        
        router.push('/admin/pos');

        // router.push(`/admin/pos/invoice/${ data!.id }/pdf`, { })
        window.open(`/admin/pos/invoice/${data!.id}/pdf`, '_blank');
    }

    return {
        isLoading,
        handleSubmit
    }

}