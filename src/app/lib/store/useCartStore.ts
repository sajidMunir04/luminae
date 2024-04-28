import { create } from "zustand"
import { CartProduct } from "../../utils/CartProduct"
import { Product } from "../../utils/Product"
import { useState } from "react"
import { getCookie, setCookie } from "cookies-next";

interface State {
    cartProducts : CartProduct[]
    totalItems: number,
    totalPrice: number
}

interface Actions {
    fetchData: () => CartProduct[]
    addToCart: (product : Product) => void
    removeFromCart: (product : Product) => void
}

const initialState : State = {
    cartProducts: [],
    totalItems: 0,
    totalPrice: 0
}

const dataStoreKey : string = 'asdavbeq2123123123123';

export const useCartStore = create<State & Actions>((set,get) => ({

    fetchData: () => {
        console.log("this is also executed");
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const cartProducts : CartProduct[] = JSON.parse(storedProductData);
            if (cartProducts)
                return cartProducts;
        }

        return [];
    },

    cartProducts: initialState.cartProducts ,
    totalItems: initialState.totalItems,
    totalPrice: initialState.totalPrice,

    addToCart : (product: Product) => {
        let products : CartProduct[] = get().cartProducts;
        const storedProductData = getCookie(dataStoreKey);
        if (storedProductData) {
            const cartProducts : CartProduct[] = JSON.parse(storedProductData);
            if (cartProducts)
                products = cartProducts;
        }
        const cartProduct = products.find((item) => item.product._id === product._id);

        if (cartProduct)
        {
            const updatedProducts : CartProduct[] = products.map((item) => 
                (item.product._id == product._id ? item : item));
            
            set(state => ({
                cartProducts: updatedProducts,
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + product.price
            }))
        }
        else{
            const newProduct : CartProduct = {
                product: product,
                quantity: 1,
                totalPrice: product.price
            }
            const updatedProducts = [...products,newProduct];
            set (state => ({
                cartProducts: updatedProducts,
                totalItems: updatedProducts.length,
                totalPrice: state.totalPrice + newProduct.totalPrice
            }))
            setCookie(dataStoreKey, JSON.stringify(get().cartProducts));
        }
    },

    removeFromCart: (product: Product) => {
        let products : CartProduct[] = get().cartProducts;
        const storedProductData = localStorage.getItem(dataStoreKey);
        if (storedProductData) {
            const cartProducts : CartProduct[] = JSON.parse(storedProductData);
            products = cartProducts;
        }
        
        set(state => ({
            cartProducts: state.cartProducts.filter((item) => item.product._id !== product._id),
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - 1,
        }));
        setCookie(dataStoreKey, JSON.stringify(get().cartProducts));
    },
}))
