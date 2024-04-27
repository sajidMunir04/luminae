import { useState } from "react";
import { useCartStore } from "../lib/store/useCartStore";
import CartItem from "./CartItem";


function Cart() {
    const cartProducts = useCartStore(state => state.cartProducts);
    console.log("Products are",cartProducts);
    //const total = cartProducts.reduce((acc,product) => (acc+product.product.price * product.quantity),0);
    const [totalAmount,setTotalAmount] = useState(0);
    return (<div>
        <div>
            <div>
                <p>
                    Cart
                </p>
                <div>
                    {cartProducts.map((cartProduct) => (<CartItem productName={cartProduct.product.name} 
                    imageLink={cartProduct.product.images[0]} color={cartProduct.product.color} price={cartProduct.product.price} quantity={cartProduct.quantity} totalPrice={cartProduct.quantity * cartProduct.product.price}/>))
                    }
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>);
}

export default Cart;