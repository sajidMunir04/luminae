import { createContext } from "react";
import { Product } from "./ProductsContext";

interface CartProduct{
    product : Product,
    quantity : number,
    totalPrice: number
}

interface CartContextType {
    cartProducts : CartProduct[]
}

export const CartContext = createContext<CartContextType>({cartProducts : []});


const CartManager = ({children}) => {
    return (<CartContext.Provider value={{cartProducts : []}}>
        {children}
    </CartContext.Provider>);
}

export default CartManager;

