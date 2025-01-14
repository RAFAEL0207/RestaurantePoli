import { prisma } from "@/libs";
import { ICategoryWithSubcategories } from "../interfaces/category-with-subcategories.interface";

export const getCategoriesWithSubcategories = async () => {

    try {
        const categories = await prisma.categories.findMany({
            include: {
                products: true
            }
        });
    
        const parentCategories = categories.filter((category) => category.categoryParent === null);
    
        const categoriesWithSubcategories = parentCategories.map((parent) => {
            const subcategories = categories.filter((category) => category.categoryParent?.id === parent.id);
    
            return { ...parent, subcategories };
        });
    
        return categoriesWithSubcategories as ICategoryWithSubcategories[];
        
    } catch (error) {
        
    }
};
