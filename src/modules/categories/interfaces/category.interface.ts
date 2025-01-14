export interface ICategory {
    id: string;
    name: string;
    categoryParent: {
        id: string;
        name: string;
    } | null;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
