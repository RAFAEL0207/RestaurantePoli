import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import {  ModalProduct } from '../ModalProduct';

import { IProduct } from '../..';
import { DeleteProductModal } from '../DeleteProductModal';
import { Edit01Icon, EyeIcon } from 'hugeicons-react';

interface Props {
    product: IProduct;
}


export const ProductTableActions = ({ product }: Props) => {

    const router = useRouter()

    return (
        <div>
            <ModalProduct
                product={product}
            />
            <Button 
                onPress={() => router.push('/admin/inventory/products/edit/' + product.id )}
                variant='light' color='primary' isIconOnly startContent={<Edit01Icon size={18} />} />
            <DeleteProductModal
                productName={product.name}
                productId={ product.id }
            />
        </div>
    )
}
