import { create } from "zustand"
import { CartProduct } from "../../utils/CartProduct"
import { Product } from "../../utils/Product"
import { useState } from "react"
import { getCookie, setCookie } from "cookies-next";

interface State {
    products : Product[]
}

interface Actions {
    fetchData: () => Product[]
    addToFavorites: (product : Product) => void
    removeFromFavorites: (product : Product) => void
}
const dataStoreKey : string = 'asdavbeq2123123123123';

export const useFavoritesStore = create<State & Actions>((set,get) => ({

    fetchData: () => {
        console.log("this is also executed");
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const products : Product[] = JSON.parse(storedProductData);
            if (products)
                return products;
        }

        return [];
    },

    products: [],

    addToFavorites : (product: Product) => {
        let products : Product[] = get().products;
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const cartProducts : Product[] = JSON.parse(storedProductData);
            if (cartProducts)
                products = cartProducts;
        }
        const cartProduct = products.find((item) => item._id === product._id);

        if (!cartProduct)
        {
            const updatedProducts : Product[] = [...products,product];
            
            set(state => ({
                products: updatedProducts
            }))

            setCookie(dataStoreKey, JSON.stringify(get().products));
        }
    },

    removeFromFavorites: (product: Product) => {
        let existingProducts : Product[] = get().products;
        const storedProductData = localStorage.getItem(dataStoreKey);
        if (storedProductData) {
            const cartProducts : Product[] = JSON.parse(storedProductData);
            existingProducts = cartProducts;
        }

        if (existingProducts.length > 0)
        {
            existingProducts = existingProducts.filter((item) => item._id !== product._id);
            set(state => ({
                products: existingProducts
            }));
            setCookie(dataStoreKey, JSON.stringify(get().products));
        }
    },
}))
