import { createContext, useContext, useState } from "react";
import { Product } from "./Product";

interface CartProduct{
    product : Product,
    quantity : number,
    totalPrice: number
}

export interface CartContextType {
    cartProducts : CartProduct[],
    add: (product : Product) => void,
    remove: (product : Product) => void
}

export const CartContext = createContext<CartContextType>({
    cartProducts: [] as CartProduct[],
    add: (product: Product) => ({}),
    remove: (product: Product) => ({})
});

const CartManager = ({children}) => {

    const [cart,setCart] = useState([] as CartProduct[]);

    const addToCart = (productToAdd : Product) =>{
        const cartProduct : CartProduct = {
            product: productToAdd,
            quantity: 1,
            totalPrice: 1
        }
        setCart([...cart,cartProduct]);
    }

    const removeFromCart = (productToRemove : Product) => {
        setCart(cart.filter((item) => (item.product._id !== productToRemove._id)));
    }

    return (<CartContext.Provider value={{cartProducts : cart
     ,add : addToCart, remove : removeFromCart}}>
        {children}
    </CartContext.Provider>);
}

export default CartManager;

