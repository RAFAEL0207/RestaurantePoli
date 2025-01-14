import Link from "next/link";

import { TitlePage } from "@/modules/shared";
import { NewProductForm } from "@/modules/products";
import { getCategories } from "@/modules/categories/actions/get-categories";
import { ArrowLeft01Icon } from "hugeicons-react";

export default async function NewProductPage() {

    const { data: categories } = await getCategories();

    return (
        <>
            <header className="new-product__header">
                <div className="new-product__header--container">
                    <Link className="new-product__header--link" href={`/admin/inventory/products`}>
                        <span>
                            <ArrowLeft01Icon size={18}/>
                        </span>
                        Vovler
                    </Link>
                    <TitlePage
                        title="Nuevo producto"
                        subTitle="Agrega un nuevo producto a tu inventario"
                    />
                </div>
            </header>

            <NewProductForm
                categories={categories!}
            />
        </>
    );
}