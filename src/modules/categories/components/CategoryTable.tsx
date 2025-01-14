'use client'

import { formatDate } from '@/utils';
import { DeleteCategoryModal, EditCategoryModal, ICategory } from '..'

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'



interface Props {
    categories: ICategory[];
}

export const CategoryTable = ({ categories }: Props) => {


    return (
        <Table
            className='shadow-none container'
            aria-label="Table for all products"
            classNames={{
                th: ['bg-primary-soft'],
                wrapper: 'shadow-sm',
            }}
            checkboxesProps={{
                classNames: {
                    wrapper: "shadow-none after:bg-black after:text-background text-background",
                },
            }}
        >
            <TableHeader>
                <TableColumn className='font-semibold text-sm'>Nombre</TableColumn>
                <TableColumn className='font-semibold text-sm'>Categoria Padre</TableColumn>
                <TableColumn className='font-semibold text-sm'>Creado</TableColumn>
                <TableColumn className='font-semibold text-sm'>Ultima actualización</TableColumn>
                <TableColumn className='font-semibold text-sm'>Acciones</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    categories.map(category => (
                        <TableRow key={category.id}>

                            <TableCell>{category.name}</TableCell>
                            <TableCell>
                                {category.categoryParent ? category.categoryParent.name : 'Ninguna'}
                            </TableCell>
                            <TableCell>{formatDate(category.createdAt)}</TableCell>
                            <TableCell>{formatDate(category.updatedAt)}</TableCell>

                            <TableCell className='flex'>
                                <EditCategoryModal category={category} />
                                <DeleteCategoryModal categoryId={category.id} categoryName={category.name} />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
