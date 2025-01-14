import { ClipboardIcon, Layers01Icon, Store01Icon } from 'hugeicons-react';
import Link from 'next/link';

export const NavBarInv = () => {

    return (
        <div className="bg-white py-4 ">
            <div className="container">
                <ul className="flex flex-col md:flex-row gap-[3rem] ">
                    <li>
                        <Link className="flex items-center gap-2 hover:text-primary transition-all" href='/admin/inventory/products'>
                            <div className="bg-primary-soft text-gray-500 p-2 rounded-full text-xl">
                                <ClipboardIcon />
                            </div>
                            <p className="font-medium text-black">
                                Productos
                                <span className="block text-sm text-gray-500">Gestion de recursos</span>
                            </p>
                        </Link>
                    </li>

                    <li>
                        <Link className="flex items-center gap-2 hover:text-primary transition-all" href='/admin/inventory/categories'>
                            <div className="bg-primary-soft text-gray-500 p-2 rounded-full text-xl">
                                <Layers01Icon />
                            </div>
                            <p className="font-medium text-black">
                                Categorias
                                <span className="block text-sm text-gray-500">Categorias disponibles</span>
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
