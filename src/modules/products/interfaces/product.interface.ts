export interface IProduct {
    id:         string;
    name:       string;
    slug:       string;
    price:      number;
    image:      null;
    stock:      number;
    createdAt:  Date;
    updatedAt:  Date;
    categoryId: string;
    category:   {
        id:   string;
        name: string;
    };
}