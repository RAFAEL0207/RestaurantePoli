import { useState } from "react";
import { deleteProduct } from "../actions/delete-product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const useDeleteProduct = (productId: string) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteProduct = async () => {

        setIsLoading(true);

        const { error, data } = await deleteProduct(productId);

        if (error) {
            toast.error('Ocurrio un error', {
                description: error,
            });

            setIsLoading(false);

            return;
        }


        toast.success(data);

        setIsLoading(false);

        router.push('/admin/inventory/products');
    }

    return {
        isLoading,
        handleDeleteProduct,
    }
}