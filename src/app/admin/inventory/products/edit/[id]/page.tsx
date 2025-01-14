

import { getCategories } from "@/modules/categories/actions/get-categories";

import { TitlePage } from "@/modules/shared";
import { EditProductForm, getProductById } from "@/modules/products";
import { PreviousPageButton } from "@/modules/shared/components/PreviousPageButton";

interface Props {
    params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
    const productId = (await params).id;

    const categoriesPromise = getCategories();
    const productPromise = getProductById(productId);


    const [productResponse, categoriesResponse] = await Promise.all([productPromise, categoriesPromise]);

    const { data: product, error } = productResponse;
    const { data: categories } = categoriesResponse;

    if (error) {
        return (
            <>
                <h2>Ocurrio un error.</h2>
            </>
        )
    }

    return (
        <>
            <header className="edit-product__header">
                <div className="edit-product__header--container">
                    <PreviousPageButton />
                    <TitlePage
                        title="Editar producto"
                        subTitle="Edita la informacion del producto"
                    />
                </div>
            </header>

            <EditProductForm
                categories={categories!}
                product={product!}
            />

        </>
    );
}