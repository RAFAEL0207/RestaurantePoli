import { TitlePage } from "@/modules/shared"
import { CategoryTable } from "@/modules/categories/components/CategoryTable";
import { getCategories } from "@/modules/categories/actions/get-categories";
import { NewCategoryModal } from "@/modules/categories/components/NewCategoryModal";



export default async function CategoriesPage() {

    const { data: categories } = await getCategories();

    const categoryParents = categories?.filter((category) => category.categoryParent == undefined)


    return (
        <>
            <header className="category__header">
                <div className="category__container">
                    <TitlePage
                        title="Categorias"
                        subTitle="Gestiona las categorias para tus productos"
                    />

                    <NewCategoryModal categoryParents={categoryParents!} />
                </div>
            </header>

            <section>
                <CategoryTable categories={categories!} />
            </section>
        </>

    );
}