import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { IProduct } from '..';

import { toast } from 'sonner';
import { updateProduct } from '@/modules/products';

export const useEditProductForm = (product: IProduct) => {
    const router = useRouter();

    // Estados
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    // Manejar cambio de imágenes
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            const imagesArray = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const name = form.elements.namedItem('name') as HTMLInputElement;
        const price = form.elements.namedItem('price') as HTMLInputElement;
        const categoryId = form.elements.namedItem('categoryId') as HTMLInputElement;
        const stock = form.elements.namedItem('stock') as HTMLInputElement;

        const updateProductData = {
            id: product.id,
            name: name.value,
            price: +price.value,
            categoryId: categoryId.value,
            stock: +stock.value,
        };

        const { data, error } = await updateProduct(updateProductData);

        if (error) {
            toast.error('Ocurrió un error', { description: error });
            setIsLoading(false);
            return;
        }

        toast.success('Producto actualizado', { description: data });
        setIsLoading(false);
        router.push('/admin/inventory/products');
    };

    return {
        isLoading,
        selectedImages,
        handleImageChange,
        handleSubmit,
    };
};
