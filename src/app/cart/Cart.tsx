"use client";

import { useState } from "react";
import { useCartStore } from "../lib/store/useCartStore";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";


function Cart() {
    const cartProducts = useCartStore(state => state.fetchData());
    const totalPrice = useCartStore(state => state.totalPrice);
    console.log("Products are",cartProducts);
    //const total = cartProducts.reduce((acc,product) => (acc+product.product.price * product.quantity),0);
    const [totalAmount,setTotalAmount] = useState(0);
    return (<div className={styles.container}>
        <div className={styles.productsContainer}>
                <p>
                    Cart
                </p>
                <div>
                    {cartProducts.map((cartProduct) => (<CartItem product={cartProduct}/>))}
                </div>
        </div>
        <div className={styles.orderInfoContainer}>
            <div className={styles.orderPricingSection}>
                <p className={styles.orderBoxHeading}>Order Summary</p>
                <div className={styles.orderFigureInfoContainer}>
                    <p className={styles.orderInfoText}>Price</p>
                    <p className={styles.orderFigureText}>${totalPrice}</p>
                </div>
                <div className={styles.orderFigureInfoContainer}>
                    <p className={styles.orderInfoText}>Shipping</p>
                    <p className={styles.orderFigureText}>$0</p>
                </div>
                <div className={styles.orderFigureInfoContainer}>
                    <p className={styles.orderInfoText}>Tax</p>
                    <p className={styles.orderFigureText}>$0</p>
                </div>
                <div className={styles.orderFigureInfoContainer}>
                    <p className={styles.orderInfoText}>Discount</p>
                    <p className={styles.orderFigureText}>$0</p>
                </div>
            </div>
            <div className={styles.totalSection}>
                <p>Total Price: </p>
                <p>{totalPrice}</p>
            </div>
            <button className={styles.checkoutButton}><img className={styles.btnImage} src="/images/product/checkOut.svg"/>CHECKOUT</button>
        </div>
    </div>);
}

export default Cart;