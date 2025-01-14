import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createProduct } from '@/modules/products';
import { uploadImage } from '@/modules/shared';
import { toSlug } from '@/utils';

interface UseNewProductFormProps {
    categories: { id: string; name: string }[];
}

export const useNewProductForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    // Manejo de imágenes seleccionadas
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files || files[0].size >= 1000000) {
            toast.error('Ocurrió un error', {
                description: 'La imagen es muy grande',
            });
            return;
        }

        const imagesArray = Array.from(files).map((file) =>
            URL.createObjectURL(file)
        );
        setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
    };

    // Manejo del envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const name = form.elements.namedItem('name') as HTMLInputElement;
        const price = form.elements.namedItem('price') as HTMLInputElement;
        const categoryId = form.elements.namedItem('categoryId') as HTMLInputElement;
        const stock = form.elements.namedItem('stock') as HTMLInputElement;
        const imageInput = form.elements.namedItem('image') as HTMLInputElement;

        // Subida de imagen
        const { data: imageUrl, error: errorImageUpload } = await uploadImage(
            imageInput.files![0]
        );

        if (errorImageUpload) {
            toast.error('Error al subir imagen', {
                description: errorImageUpload,
            });
            setIsLoading(false);
            return;
        }

        // Creación del producto
        const product = {
            image: imageUrl,
            name: name.value,
            stock: +stock.value,
            price: +price.value,
            categoryId: categoryId.value,
            slug: toSlug(name.value),
        };

        const { error, data } = await createProduct(product);

        if (error) {
            toast.error('Ocurrió un error', {
                description: error,
            });
            setIsLoading(false);
            return;
        }

        toast.success('Producto creado exitosamente', {
            description: data,
        });

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
