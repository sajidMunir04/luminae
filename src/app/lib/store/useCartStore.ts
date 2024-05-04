import { create } from "zustand"
import { Product } from "../../utils/Product"
import { useState } from "react"
import { getCookie, setCookie } from "cookies-next";

interface State {
    cartData : CartData
}

interface Actions {
    fetchData: () => CartData
    addToCart: (product : Product) => void
    removeFromCart: (product : Product) => void
}

export interface CartData {
    productsInfo: ProductInfo[],
    totalItems: number,
    totalPrice: number
}

interface ProductInfo{
    id: string,
    quantity: number
}

const initialState : State = {
    cartData: {
        productsInfo: [],
        totalItems: 0,
        totalPrice: 0
    }
}

const defaultData : CartData ={
    productsInfo: [],
    totalItems: 0,
    totalPrice: 0
}

const dataStoreKey : string = 'cart_products_ids';

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

    addToCart : (product: Product) => {
        let storedProducts : CartData = {
            productsInfo: [],
            totalItems: 0,
            totalPrice: 0
        };
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const cartData : CartData = JSON.parse(storedProductData);
            if (cartData)
                storedProducts = cartData;
        }

        const productInCart = storedProducts.productsInfo.find((item) => item.id  === product._id);

        if (productInCart)
        {
            productInCart.quantity = productInCart.quantity + 1;
            storedProducts.totalItems++;
            storedProducts.totalPrice += product.price;
        }
        else{
            const newProduct : ProductInfo = {
                id: product._id,
                quantity: 1
            }

            storedProducts.productsInfo.push(newProduct);
        }

        set(state => ({
            cartData: storedProducts
        }))

        setCookie(dataStoreKey, JSON.stringify(storedProducts));
    },

    removeFromCart: (product: Product) => {
        let products : CartData = {
            productsInfo: [],
            totalItems: 0,
            totalPrice: 0
        };
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const cartProducts : CartData = JSON.parse(storedProductData);
            products = cartProducts;
        }

        const filteredProductsData : ProductInfo[] = products.productsInfo.filter((item) => item.id !== product._id);
        products.productsInfo = filteredProductsData;
        set(state => ({
            cartData: products
        }));
        setCookie(dataStoreKey, JSON.stringify(products));
    },
}))
