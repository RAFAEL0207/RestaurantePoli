// ACTIONS
export * from './actions/create-product';
export * from './actions/delete-product';
export * from './actions/get-all-products';

export { getProductById } from './actions/get-product-by-id';
export { updateProduct } from './actions/update-product';

// COMPONENTS
export * from './components/NewProductForm';
export * from './components/ProductReportCard';
export * from './components/products-table/ProductsTable';
export { EditProductForm } from './components/EditProductForm';


// INTERFACES
export * from './interfaces/create-product-response';
export * from './interfaces/product-types-response';
export type { IProduct } from './interfaces/product.interface';
