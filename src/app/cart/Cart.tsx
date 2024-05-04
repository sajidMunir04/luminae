import { useEffect, useState } from "react";
import { useCartStore } from "../lib/store/useCartStore";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import { Product } from "../utils/Product";
import CustomerInformation from "./CustomerInformation";
import PaymentAndShipping from "./PaymentAndShipping";
import { OrderData } from "./OrderData";
import { CartProduct } from "./CartProduct";
import OrderConfirmation from "./OrderConfirmation";


function Cart() {
    const cartData = useCartStore(state => state.fetchData());
    const [totalAmount,setTotalAmount] = useState(cartData.totalPrice);
    const [totalItems,setTotalItems] = useState(cartData.totalItems);
    const [products,setProducts] = useState<CartProduct[]>([]);
    const [cartState,setCartState] = useState(CartState.Cart);
    const [shippingCharges,setShippingCharges] = useState<number>();
    const [taxes,setTaxes] = useState<number>();

    const defaultOrderData : OrderData = {
        cartProducts: products,
        paymentServiceInfo: {
            paymentService: "",
            paymentServiceImageLink: "",
            info: ""
        },
        shippingServiceInfo: {
            shippingService: "",
            shippingServiceImageLink: "",
            deliveryTime: "",
            shippingCost: 0,
            hasInsurancePolicy: false
        },
        email: "",
        firstName: "",
        lastName: "",
        country: "",
        region: "",
        address: "",
        phoneNumber: 0
    }

    const [orderData,setOrderData] = useState(defaultOrderData);

    const removeProductFromCart = (product: Product) => {
        const filteredProducts = (products as CartProduct[]).filter((item) => item.product._id !== product._id);
        setProducts(filteredProducts);
    }

    useEffect(() => {
        const productsId : string[] = [];
        cartData.productsInfo.map((item) => productsId.push(item.id));
        const fetchData =  async() => {
            try {
                const response = await fetch('api/fetchSpecificProducts/' + productsId);
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
                
                const cartProducts : CartProduct[] = []; 
                products.map((item,index) => {
                    const cartProduct : CartProduct = {
                        product: item,
                        quantity: cartData.productsInfo[index].quantity
                }
                cartProducts.push(cartProduct);
            });

                setProducts(cartProducts);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();

    },[])

    return (<div className={styles.container}>
        <div className={styles.navigationSection}>
            <p onClick={() => setCartState(CartState.Cart)} className={styles.navElement}>Cart</p>
            <p onClick={() => setCartState(CartState.CustomerInfo)} className={styles.navElement}>Customer Info</p>
            <p onClick={() => setCartState(CartState.ShippingandPayment)} className={styles.navElement}>Payment</p>
            <p onClick={() => setCartState(CartState.OrderConfirmation)} className={styles.navElement}>Order Confirmation</p>
        </div>
        <div className={styles.contentSection}>
            <div className={styles.contentContainer}>
            {cartState === CartState.Cart && <>
            <div className={styles.productsContainer}>
                    <p>
                        Cart
                    </p>
                    <div>
                        {products?.map((item) => <CartItem cartProduct={item} onProductRemove={() => removeProductFromCart(item.product)}/>)}
                    </div>
            </div>
            </>}
            {cartState === CartState.CustomerInfo && <>
                <CustomerInformation orderData={orderData} setOrderData={() => {setOrderData}}/>
            </>}
            {cartState === CartState.ShippingandPayment && <>
                <PaymentAndShipping orderData={orderData} setOrderData={() => {setOrderData}}/>
            </>}
            {cartState === CartState.OrderConfirmation && <>
                <OrderConfirmation orderData={orderData} setOrderData={() => {setOrderData}}/>
            </>}
            </div>
            <div className={styles.orderInfoContainer}>
                <div className={styles.orderPricingSection}>
                    <p className={styles.orderBoxHeading}>Order Summary</p>
                    <div className={styles.orderFigureInfoContainer}>
                        <p className={styles.orderInfoText}>Price</p>
                        <p className={styles.orderFigureText}>${totalAmount}</p>
                    </div>
                    <div className={styles.orderFigureInfoContainer}>
                        <p className={styles.orderInfoText}>Shipping</p>
                        <p className={styles.orderFigureText}>$0</p>
                    </div>
                    <div className={styles.orderFigureInfoContainer}>
                        <p className={styles.orderInfoText}>Tax</p>
                        <p className={styles.orderFigureText}>$0</p>
                    </div>
                </div>
                <div className={styles.totalSection}>
                    <p>Total Price: </p>
                    <p>${totalAmount}</p>
                </div>
                <button className={styles.checkoutButton}><img className={styles.btnImage} src="/images/product/checkOut.svg"/>CHECKOUT</button>
            </div>
        </div>
    </div>);
}

enum CartState{
    Cart,
    CustomerInfo,
    ShippingandPayment,
    OrderConfirmation
}

export default Cart;