import { ICategory } from "./category.interface";

export interface ICategoryWithSubcategories {

    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    categoryParent: {
        id: string;
        name: string;
    } | null;

    subcategories: ICategory[];
}