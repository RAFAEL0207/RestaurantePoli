import { CategoriesFilter } from "@/modules/categories/components/CategoriesFilter";
import { getCategoriesWithSubcategories } from "@/modules/categories/actions/get-parent-categories";

import { ProductGrid } from "@/modules/products/components/ProductGrid";
import { getProductsByCategories } from "@/modules/products/actions/get-products-by-category";




interface Props {
    searchParams: Promise<{ [key: string]: string }>
}

export default async function POSPage(props: Props) {

    const params = await props.searchParams;
    const categories = await getCategoriesWithSubcategories();

    const { data: products } = await getProductsByCategories(params.category);
 

    return (
        <>
            <section>
                <div className="container">
                    <CategoriesFilter categories={categories!} />
                </div>
            </section>

            <section>
                <div className="container">
                    <ProductGrid products={products} />
                </div>
            </section>
        </>
    )
}