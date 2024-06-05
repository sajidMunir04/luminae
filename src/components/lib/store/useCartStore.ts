import { create } from "zustand"
import { Product } from "../../utils/Product"
import { useState } from "react"
import { getCookie, setCookie } from "cookies-next";

interface State {
    cartData : CartData
}

interface Actions {
    fetchData: () => CartData
    addToCart: (product : Product,productSize : string) => void
    removeFromCart: (product : Product) => void
    getProductCount: () => number,
    clearCart: () => void
}

export interface CartData {
    productsInfo: ProductInfo[],
    totalItems: number
}

interface ProductInfo{
    id: string,
    quantity: number,
    size: string
}

const initialState : State = {
    cartData: {
        productsInfo: [],
        totalItems: 0
    }
}

const defaultData : CartData ={
    productsInfo: [],
    totalItems: 0
}

const dataStoreKey : string = 'cart_adsfsdfsdfsddsadas';

export const useCartStore = create<State & Actions>((set,get) => ({
    cartData: initialState.cartData,

    fetchData: () => {
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const cartProducts : CartData = JSON.parse(storedProductData);
            if (cartProducts)
            {
                return cartProducts;
            }
        }

        return defaultData;
    },

    clearCart: () => {
        setCookie(dataStoreKey, '',{sameSite: 'strict'});
    },

    getProductCount: () => {
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const cartProducts : CartData = JSON.parse(storedProductData);
            if (cartProducts)
            {
                return cartProducts.totalItems;
            }
        }

        return 0;
    },

    addToCart : (product: Product,productSize : string) => {
        let storedProducts : CartData = {
            productsInfo: [],
            totalItems: 0
        };
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const cartData : CartData = JSON.parse(storedProductData);
            if (cartData)
                storedProducts = cartData;
        }

        const productInCart = storedProducts.productsInfo.find((item) => item.id  === product._id);

        if (productInCart && productInCart.size === productSize)
        {
            productInCart.quantity = productInCart.quantity + 1;
        }
        else{
            const newProduct : ProductInfo = {
                id: product._id,
                quantity: 1,
                size: productSize
            }

            storedProducts.productsInfo.push(newProduct);
        }
        storedProducts.totalItems = storedProducts.productsInfo.length;
        set(state => ({
            cartData: storedProducts
        }))

        setCookie(dataStoreKey, JSON.stringify(storedProducts),{sameSite: 'strict'});
    },

    removeFromCart: (product: Product) => {
        let products : CartData = {
            productsInfo: [],
            totalItems: 0
        };
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const cartProducts : CartData = JSON.parse(storedProductData);
            products = cartProducts;
        }

        const filteredProductsData : ProductInfo[] = products.productsInfo.filter((item) => item.id !== product._id);
        products.totalItems = filteredProductsData.length;
        products.productsInfo = filteredProductsData;
        set(state => ({
            cartData: products,        
        }));
        setCookie(dataStoreKey, JSON.stringify(products),{sameSite: 'strict'});
    },
}))
