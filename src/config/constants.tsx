import { ReactNode } from "react";
import { Hamburger01Icon, Task01Icon, PackageIcon, CoinsDollarIcon, UserGroupIcon, ShoppingCart01Icon } from "hugeicons-react";
import type { IUserRole } from "@/modules/auth/interfaces/user";


interface SideMenuOption {
    name: string;
    path: string;
    icon: ReactNode;
    role: IUserRole[];
}



export const sidemenu_options: SideMenuOption[] = [
    // {
    //     name: 'Inicio',
    //     path: '/admin/home',
    //     icon: <Hamburger01Icon size={22} />,
    //     role: ['Cajero', 'Admin', 'Cocina', 'Mesero'],
    // },
    {
        name: 'POS',
        path: '/admin/pos',
        icon: <ShoppingCart01Icon size={22} />,
        role: ['Admin', 'Cajero', 'Mesero'],
    },
    {
        name: 'Ordenes',
        path: '/admin/orders',
        icon: <PackageIcon size={22} />,
        role: ['Admin', 'Cocina', 'Mesero', 'Cajero'],
    },
    {
        name: 'Clientes',
        path: '/admin/clients',
        icon: <UserGroupIcon size={22} />,
        role: ['Admin'],
    },
    {
        name: 'Gestion Inventario',
        path: '/admin/inventory/products',
        icon: <Task01Icon size={22} />,
        role: ['Admin', 'Cajero'],
    },
    {
        name: 'Reporte de Ventas',
        path: '/admin/sales-report',
        icon: <CoinsDollarIcon size={22} />,
        role: ['Admin', 'Cajero'],
    },
    {
        name: 'Gestion de Usuarios',
        path: '/admin/users',
        icon: <UserGroupIcon size={22} />,
        role: ['Admin'],
    },

]