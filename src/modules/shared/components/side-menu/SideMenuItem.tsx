'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react"

interface Props {
    path: string;
    children: ReactNode;
    icon: ReactNode;
}

export const SideMenuItem = ({ children, icon, path }: Props) => {

    const pathname = usePathname();

    return (
        <Link className={`sidemenu__link ${ pathname.includes(path) ? 'sidemenu__link--active' : '' }`} href={path}>
            <span>{ icon }</span>
            <span>
                { children }
            </span>
        </Link>
    )
}
