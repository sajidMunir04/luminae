"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../lib/store/useCartStore";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import { Product } from "../utils/Product";


function Cart() {

    const defaultProduct : Product = {
        _id: "",
        name: "",
        description: "",
        price: 0,
        images: [],
        brandName: "",
        category: "",
        section: "",
        sizes: [],
        color: "",
        style: "",
        model: ""
    }

    const cartData = useCartStore(state => state.fetchData());
    const totalPrice = cartData.totalPrice; 
    console.log("Products are",cartData.productsInfo);
    const [totalAmount,setTotalAmount] = useState(0);
    const [products,setProducts] = useState<Product[]>();
    const productsId : string[] = [];
    cartData.productsInfo.map((item) => productsId.push(item.id));

    let productsData : Product[] = [];

    if (cartData.productsInfo.length === 0)
    {
        productsData.push(defaultProduct);
    }

    useEffect(() => {
        const fetchData =  async() => {
            try {
                const response = await fetch('api/fetchCartProducts/' + productsId);
                const data = await response.json();
                const products : Product[] = data.map((item: Product) => ({
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    images: item.images,
                    discount: item.discount,
                    inventoryCount: item.inventoryCount,
                    brandName: item.brandName,
                    category: item.category,
                    section: item.section,
                    sizes: item.sizes,
                    color: item.color,
                    style: item.style,
                    model: item.model,
                    reviews: item.reviews
                }));

                setProducts(products);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();

    },[])

    return (<div className={styles.container}>
        <div className={styles.productsContainer}>
                <p>
                    Cart
                </p>
                <div>
                    {products?.map((item) => <CartItem product={item} quantity={1}/>)}
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