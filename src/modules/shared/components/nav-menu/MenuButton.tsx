'use client'

import { Menu01Icon } from "hugeicons-react";
import { useUIStore } from "../..";

export const MenuButton = () => {

    const openSideMenu = useUIStore( state => state.openSideMenu );


    return (
        <div onClick={openSideMenu} className="md:hidden bg-gray-100 p-2 text-xl rounded-full cursor-pointer active:scale-95 transition-all">
            <Menu01Icon />
        </div>
    )
}
