import { ClipboardIcon, Layers01Icon, Store01Icon } from 'hugeicons-react';
import Link from 'next/link';

export const NavBarEmp = () => {

    return (
        <div className="bg-white py-4 ">
            <div className="container">
                <ul className="flex flex-col md:flex-row gap-[3rem] ">
                    <li>
                        <Link className="flex items-center gap-2 hover:text-primary transition-all" href='/admin/empleados/employees'>
                            <div className="bg-primary-soft text-gray-500 p-2 rounded-full text-xl">
                                <ClipboardIcon />
                            </div>
                            <p className="font-medium text-black">
                                Empleados
                                <span className="block text-sm text-gray-500">Gestion de Empleados</span>
                            </p>
                        </Link>
                    </li>

                    <li>
                        <Link className="flex items-center gap-2 hover:text-primary transition-all" href='/admin/empleados/roles'>
                            <div className="bg-primary-soft text-gray-500 p-2 rounded-full text-xl">
                                <Layers01Icon />
                            </div>
                            <p className="font-medium text-black">
                                Roles
                                <span className="block text-sm text-gray-500">Roles disponibles</span>
                            </p>
                        </Link>
                    </li>

                    <li>
                        <Link className="flex items-center gap-2 hover:text-primary transition-all" href='/admin/empleados/roles'>
                            <div className="bg-primary-soft text-gray-500 p-2 rounded-full text-xl">
                                <Store01Icon />
                            </div>
                            <p className="font-medium text-black">
                                Registros
                                <span className="block text-sm text-gray-500">Todos los Empleados</span>
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
