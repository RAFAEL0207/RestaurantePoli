'use client'
import { MoreVerticalIcon } from 'hugeicons-react'

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { deleteCategory } from '../actions/delete-category'


interface Props {
    id: string
}

export const CategoryCardOptions = ({ id }: Props) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <div>
                    <MoreVerticalIcon size={22} />
                </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="edit">
                    {/* <EditCategoryModal/> */}
                </DropdownItem>
                <DropdownItem onClick={() => deleteCategory( id )} key="delete" className="text-danger" color="danger">
                    Eliminar
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
