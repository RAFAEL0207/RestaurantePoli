import Link from "next/link";

import { TitlePage } from "@/modules/shared"
import { ProductReportCard, ProductsTable, getAllProducts } from "@/modules/products";
    ;
import { Add01Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";


export default async function ProductsPage() {

    const { data } = await getAllProducts();


    return (
        <>
            <header className="products__header">
                <div className="products__header__title">
                    <TitlePage
                        title="Productos" subTitle="Gestiona los productos de tu empresa"
                    />
                    <Link href={`/admin/inventory/products/new`}>
                        <Button
                            as='div'
                            startContent={<Add01Icon />}
                            className="btn-primary"
                        >
                            Crear producto
                        </Button>
                    </Link>
                </div>
            </header>
            <ProductsTable
                products={data!}

            />
        </>
    );
}