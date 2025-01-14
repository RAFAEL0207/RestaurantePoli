'use client'
import Image from 'next/image';
import NotImage from "@/assets/images/not-image.jpg";

import { IProduct } from '../../interfaces/product.interface';

import { ProductTableActions } from './ProductTableActions';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { formatDate } from '@/utils';

interface Props {
    products: IProduct[];
}

export const ProductsTable = ({ products }: Props) => {
    
    return (
        <section className='container'>
            <Table
                className='shadow-none'
                aria-label="Table for all products"
                classNames={{
                    th: ['bg-primary-soft'],
                    wrapper: 'shadow-sm',
                }}
            >
                <TableHeader>
                    <TableColumn className='font-semibold text-sm'>Imagen</TableColumn>
                    <TableColumn className='font-semibold text-sm'>Nombre</TableColumn>
                    <TableColumn className='font-semibold text-sm'>Categoria</TableColumn>
                    <TableColumn className='font-semibold text-sm'>Precio</TableColumn>
                    <TableColumn className='font-semibold text-sm'>Creado</TableColumn>
                    <TableColumn className='font-semibold text-sm'>Última actualización</TableColumn>
                    <TableColumn className='font-semibold text-sm'>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {
                        products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Image
                                        alt={product.name}
                                        width={100}
                                        height={100}
                                        className='max-w-[50px]'
                                        src={product.image || NotImage}
                                    />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>{product.price} Bs.</TableCell>
                                <TableCell>{formatDate(product.createdAt)}</TableCell>
                                <TableCell>{formatDate(product.updatedAt)}</TableCell>
                                <TableCell>
                                    <ProductTableActions
                                        product={product}
                                    />
                                </TableCell>
                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>
        </section>
    )
}