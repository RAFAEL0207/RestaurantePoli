import { useState } from "react";
import { useRouter } from 'next/navigation';

import { toast } from "sonner";
import { deleteCategory } from "../actions/delete-category";

export const useDeleteCategory = ( categoryId : string) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Función para eliminar la categoría
    const handleSubmit = async () => {
        setIsLoading(true);

        const { data, error } = await deleteCategory(categoryId);

        if (error) {
            toast.error('Ocurrió un error', { description: error });
            setIsLoading(false);
            return;
        }

        
        toast.success(data);
        
        setIsLoading(false);
    };

    return {
        isLoading,
        handleSubmit,
    };
};
