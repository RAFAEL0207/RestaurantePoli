import { MenuGrid } from "@/modules/menu/components/MenuGrid";
import { getAllProducts } from "@/modules/products";
import { Metadata } from "next";
import Image from "next/image";
import Logo from '@/assets/images/logo.png';

export const revalidate = 86400;

export default async function MenuPage() {

    const { data: products } = await getAllProducts();

    return (
        <>
            <header className="menu__header text-center  text-white py-8 flex flex-col gap-2">
                <Image
                    width={300}
                    height={300}
                    src={Logo}
                    alt=""
                    className='mx-auto'
                />
                <h1 className="text-[2rem] md:text-[3rem]">Nuestros <span className="text-primary-400">Platos</span></h1>
                <p className="text-gray-200">Conoce los platos disponibles que tenemos para ti.</p>
            </header>

            <section className="bg-[#141414] text-white min-h-screen pt-[4rem]">
                <div className="container">
                    <MenuGrid products={products!} />
                </div>
            </section>
        </>
    );
}

export const metadata: Metadata = {
    title: "Menu Virtual - Restaurante Poli"
}