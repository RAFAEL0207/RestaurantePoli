'use client'
import { User } from '@nextui-org/user';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { IUser } from '@/modules/auth/interfaces/user';
import { Logout01Icon, UserIcon } from 'hugeicons-react';
import { logout } from '@/modules/auth';


interface Props {
    user: IUser;
}

export const Avatar = ({ user }: Props) => {
    return (
        <Dropdown placement="bottom-start">
            <DropdownTrigger>
                <User
                    as="button"
                    avatarProps={{

                        isBordered: true,
                        src: user.image
                    }}
                    className="transition-transform"
                    description={ user.role }
                    name={`${user.name}`}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="username" className="h-14 gap-2">
                    <p className="font-bold">Sesion iniciada con</p>
                    <p className="font-bold">{ user.email }</p>
                </DropdownItem>
                <DropdownItem onPress={logout} startContent={ <Logout01Icon/> } key="logout" color="danger">
                    Cerrar Sesion
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>

    )
}
