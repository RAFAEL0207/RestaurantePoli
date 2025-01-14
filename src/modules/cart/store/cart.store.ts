import { create, StateCreator } from "zustand"

import { toast } from "sonner";
import { IProduct } from "@/modules/products";
import { persist } from "zustand/middleware";


export interface ICart {
    id: string,
    name: string,
    quantity: number,
    price: number | string,
    image: string | null
}


interface CartState {
    cart: ICart[],
    total: number;
}


interface CartMethods {
    calcTotal: () => void
    cleanCart: () => void,
    incrementQuantity: (id: string) => void
    decrementQuantity: (id: string) => void
    removeProductToCart: (id: string) => void
    addProductToCart: (product: IProduct) => void;
}



// INFORMACION
const storeApi: StateCreator<CartState & CartMethods> = (set, get) => ({
    cart: [],
    total: 0,


    calcTotal: () => {
        const { cart } = get();

        let subTotal = 0;

        cart.forEach(item => {
            subTotal += +item.price * item.quantity
        })

        set({ total: subTotal })

    },

    addProductToCart: (product) => {
        const { cart, calcTotal } = get();

        const productInCart = cart.some(item => item.id == product.id);

        if (productInCart) {
            toast.warning(product.name + " ya se agrego al carrito");
            return;
        }

        set({
            cart: [
                ...cart,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.image
                }
            ]
        })

        toast.success(product.name + " se agrego al carrito");
        calcTotal();
    },

    incrementQuantity: (id: string) => {
        const { cart, calcTotal } = get();

        const updateCartProducts = cart.map(item => {

            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
            }

            return item;
        })

        set({ cart: updateCartProducts });

        calcTotal();
    },

    decrementQuantity: (id: string) => {
        const { cart, calcTotal } = get();

        const updateCartProducts = cart.map(item => {

            if (item.quantity === 1) return item;

            if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
            }

            return item;
        })

        set({ cart: updateCartProducts });

        calcTotal();
    },

    removeProductToCart: (id: string) => {
        const { cart, calcTotal } = get();

        const updateCartProducts = cart.filter(item => item.id != id);

        set({ cart: updateCartProducts });

        calcTotal();
    },

    cleanCart: () => {
        set({ cart: [], total: 0 })
    }


})






// PROVEEDOR DE INFORMACION
export const useCartStore = create<CartState & CartMethods>()(
    persist(
        storeApi,
        { name: "cart-store-storage" }
    )
);