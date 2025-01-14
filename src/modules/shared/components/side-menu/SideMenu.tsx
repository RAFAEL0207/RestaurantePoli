'use client'
import { useUIStore } from '../..'
import Image from "next/image";
import logo from '../../../../assets/images/logo.png';
import { sidemenu_options } from '@/config/constants';
import { SideMenuItem } from './SideMenuItem';
import { LogoutButton } from './LogoutButton';
import { CloseSideMenuButton } from './CloseSideMenuButton';
import { IUser } from '@/modules/auth/interfaces/user';


interface Props {
    user: IUser;
}

export const SideMenu = ({ user }: Props) => {

    const isSideMeunuOpen = useUIStore(state => state.isSideMenuOpen);

    return (
        <>
            {
                isSideMeunuOpen && (
                    <div
                        className='md:hidden fixed top-0 left-0 w-screen h-screen z-20 bg-black opacity-30'
                    />
                )
            }

            <aside className={isSideMeunuOpen ? 'sidemenu sidemenu-active' : 'sidemenu '}>
                <div className='mb-8 flex items-center gap-2'>
                    <div className='bg-gray-500/10 flex items-center justify-center'>
                        <Image
                            width={200}
                            height={200}
                            src={logo}
                            alt=""
                            className='mx-auto'
                        />
                    </div>
                </div>
                <ul className='flex flex-col gap-2 '>
                    {
                        sidemenu_options.map((option, index) => (
                            option.role.includes(user.role)
                            && (

                                <li key={index}>
                                    <SideMenuItem
                                        icon={option.icon}
                                        path={option.path}
                                    >
                                        {option.name}
                                    </SideMenuItem>
                                </li>
                            )
                        ))
                    }
                </ul>
                <CloseSideMenuButton />
                <div className='flex-1'></div>
                <LogoutButton />
            </aside>
        </>
    )
}
