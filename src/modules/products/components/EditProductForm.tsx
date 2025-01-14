'use client';
import Image from 'next/image';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';

import { IProduct } from '../interfaces/product.interface';
import { ICategory } from '@/modules/categories';

import { useEditProductForm } from '../hooks/useEditProductForm';



interface Props {
    product: IProduct;
    categories: ICategory[];
}

export const EditProductForm = ({ product, categories }: Props) => {
    const {
        isLoading,
        selectedImages,
        handleImageChange,
        handleSubmit,
    } = useEditProductForm(product);

    return (
        <section className="mb-8">
            <form noValidate onSubmit={handleSubmit} className="product__form">
                <h2 className="mb-4">Editar detalles del producto</h2>

                <div className="flex flex-col gap-5 mb-4">
                    {/* Nombre */}
                    <Input
                        name="name"
                        defaultValue={product.name}
                        isRequired
                        variant="bordered"
                        placeholder="Nombre del producto"
                        labelPlacement="outside"
                        label="Nombre:"
                    />

                    {/* Vista previa de imágenes */}
                    <div className="flex gap-4">
                        {selectedImages.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Preview ${index}`}
                                width={200}
                                height={200}
                                style={{ maxWidth: '200px', maxHeight: '200px' }}
                            />
                        ))}
                    </div>

                    {/* Categoría */}
                    <Select
                        variant="bordered"
                        name="categoryId"
                        label="Selecciona una categoría"
                        labelPlacement="outside"
                        isRequired
                        defaultSelectedKeys={[product.categoryId]}
                        placeholder="Selecciona una categoría"
                        className="max-w-xs"
                    >
                        {categories.map((category) => (
                            <SelectItem value={category.id} key={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </Select>

                    {/* Subir imágenes */}
                    <div className="relative">
                        <input
                            type="file"
                            name="images"
                            onChange={handleImageChange}
                            multiple
                            accept="image/png, image/jpg, image/jpeg, image/webp"
                            className="file:bg-transparent file:text-primary file:cursor-pointer file:border-none file:p-2 rounded"
                        />
                    </div>

                    {/* Precio */}
                    <Input
                        name="price"
                        isRequired
                        variant="bordered"
                        defaultValue={`${product.price}`}
                        placeholder="20.00"
                        labelPlacement="outside"
                        type="number"
                        step="0.01"
                        label="Precio c/u:"
                    />

                    {/* Stock */}
                    <Input
                        name="stock"
                        defaultValue={`${product.stock}`}
                        isRequired
                        variant="bordered"
                        placeholder="10u."
                        labelPlacement="outside"
                        type="number"
                        label="Stock disponible"
                    />
                </div>

                {/* Botón de guardar */}
                <Button
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    type="submit"
                    className="btn-primary mt-8"
                >
                    Guardar producto
                </Button>
            </form>
        </section>
    );
};
