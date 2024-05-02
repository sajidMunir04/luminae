import { create } from "zustand"
import { Product } from "../../utils/Product"
import { useState } from "react"
import { getCookie, setCookie } from "cookies-next";

interface State {
    products: string[]
}


interface Actions {
    fetchData: () => string[]
    addToFavorites: (product : Product) => void
    removeFromFavorites: (product : Product) => void
    isAddedToFavorites: (productId: string ) => boolean
}
const dataStoreKey : string = 'favorite_product_data';

export const useFavoritesStore = create<State & Actions>((set,get) => ({

    isAddedToFavorites : (productId:string) => {
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const products : string[] = JSON.parse(storedProductData);
            if (products)
            {
                for (let i = 0; i < products.length; i++)
                {
                    if (products[i] === productId)
                        {
                            return true;
                        }
                }
            }
        }
        return false;
    },

    fetchData: () => {
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const products : string[] = JSON.parse(storedProductData);
            if (products)
                return products;
        }

        return [];
    },

    products: [],

    addToFavorites : (product: Product) => {
        let storedProducts : string[] = [];
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const cartProducts : string[] = JSON.parse(storedProductData);
            if (cartProducts)
                storedProducts = cartProducts;
        }
        const cartProduct = storedProducts.find((item) => item === product._id);

        if (!cartProduct)
        {
            storedProducts.push(product._id);
            
            set(state => ({
                products: storedProducts
            }))

            setCookie(dataStoreKey, JSON.stringify(get().products));
        }
    },

    removeFromFavorites: (product: Product) => {
        let existingProducts : string[] = [];
        const storedProductData = localStorage.getItem(dataStoreKey);
        if (storedProductData) {
            const cartProducts : string[] = JSON.parse(storedProductData);
            existingProducts = cartProducts;
        }

        if (existingProducts.length > 0)
        {
            existingProducts = existingProducts.filter((item) => item !== product._id);
            set(state => ({
                products: existingProducts
            }));
            setCookie(dataStoreKey, JSON.stringify(get().products));
        }
    },
}))
