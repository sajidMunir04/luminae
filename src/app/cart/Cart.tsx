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
import axios from "axios";
import { OrderFormData, ProductOrderDetail } from "./OrderFormData";
import { error } from "console";


function Cart() {
    const cartData = useCartStore(state => state.fetchData());
    const [totalAmount,setTotalAmount] = useState(cartData.totalPrice);
    const [orderComplete,setOrderStatus] = useState(false);
    const [shippingCharges,setShippingCharges] = useState<number>(0);   
    const [taxes,setTaxes] = useState<number>(0);

    const [orderPlaced,setOrderPlaceStatus] = useState(false);

    const [totalPrice,setTotalPrice] = useState<number>(0);

    const [products,setProducts] = useState<CartProduct[]>([]);
    const [cartState,setCartState] = useState(CartState.Cart);

    function checkOrderForm() {

        setOrderStatus(true);
    }

    function placeOrder() {
        setOrderPlaceStatus(true);

        const productDetailsForOrder : ProductOrderDetail[] = [];
        for (let i = 0; i < orderData.cartProducts.length; i++)
        {
            const productDetail : ProductOrderDetail = {
                _id: orderData.cartProducts[i].product._id,
                name: orderData.cartProducts[i].product.name,
                quantity: orderData.cartProducts[i].quantity,
                unitPrice: orderData.cartProducts[i].product.price
            }
            productDetailsForOrder.push(productDetail);
            console.log(productDetail);
        }

        const orderFormData : OrderFormData = {
            products: productDetailsForOrder,
            customerEmail: orderData.email,
            customerName: orderData.firstName + ' ' + orderData.lastName,
            customerPhone: orderData.phoneNumber,
            customerAddress: orderData.address,
            customerRegion: orderData.region,
            customerCountry: orderData.country,
            orderPriceTotal: totalPrice,
            orderShippingCharges: shippingCharges,
            orderTaxes: taxes
        }

        axios.post('api/postOrder/' + JSON.stringify(orderFormData)).then().catch((error)=> console.log(error));
    }

    const calculatePricing = (cartProducts : CartProduct[]) => {
        const totalPrices = cartProducts.map((item) => item.product.price * item.quantity);
        const totalPrice = totalPrices.reduce((acc,el) => (acc + el),0);
        setTotalAmount(totalPrice);

        async function getShippingChargesAndTaxes() {
            try {
                const response = await axios.get('api/getShippingCharges/' + totalPrice);
                console.log(response);
                const data = await response.data;
                setShippingCharges(data);
            } catch (error) {
                console.error(error);
            }

            try {
                const response = await axios.get('api/getTaxes/' + totalPrice);
                const data = await response.data;
                setTaxes(data);
            }
            catch (error){
                console.error(error);
            }

            setTotalPrice(totalAmount + shippingCharges + taxes);
        }

        getShippingChargesAndTaxes();
    }

    
    useEffect(() => {
        calculatePricing(products);
    },products)

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
        phoneNumber: ""
    }

    const [orderData,setOrderData] = useState(defaultOrderData);

    useEffect(()=> {
        checkOrderForm();
        console.log("Executed");
    },[orderData])

    const removeProductFromCart = (product: Product) => {
        const filteredProducts = (products as CartProduct[]).filter((item) => item.product._id !== product._id);
        setProducts(filteredProducts);
    }

    const onProductQuantityChange = (product: Product,quantity: number) => {
        const modifiedProducts = products.map(function (item) {
            if (item.product._id === product._id){
                item.quantity = quantity;
            } 

            return item;
        });
        setProducts(modifiedProducts);
        const newOrderData : OrderData = orderData;
        orderData.cartProducts = products;
        setOrderData(newOrderData); 

        calculatePricing(modifiedProducts);
    }


    useEffect(() => {
        const productsId : string[] = [];
        cartData.productsInfo.map((item) => productsId.push(item.id));
        const fetchData = async() => {
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
                        quantity: cartData.productsInfo[index].quantity > 0 ? cartData.productsInfo[index].quantity : 1
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
            <p onClick={() => setCartState(CartState.Cart)} className={`${styles.navElement} ${cartState === CartState.Cart && styles.navElementSelected}`}>Cart</p>
            <p onClick={() => setCartState(CartState.CustomerInfo)} className={`${styles.navElement} ${cartState === CartState.CustomerInfo && styles.navElementSelected}`}>Customer Info</p>
            <p onClick={() => setCartState(CartState.ShippingandPayment)} className={`${styles.navElement} ${cartState === CartState.ShippingandPayment && styles.navElementSelected}`}>Payment</p>
            <p onClick={() => setCartState(CartState.OrderConfirmation)} className={`${styles.navElement} ${cartState === CartState.OrderConfirmation && styles.navElementSelected}`}>Order Confirmation</p>
        </div>
        <div className={styles.contentSection}>
            <div className={styles.contentContainer}>
            {cartState === CartState.Cart && <>
            <div className={styles.productsContainer}>
                    <p>
                        Cart
                    </p>
                    <div>
                        {products?.map((item) => <CartItem product={item.product} quantity={item.quantity}
                        onProductRemove={() => removeProductFromCart(item.product)} onProductQuantityChange={onProductQuantityChange}/>)}
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
                        <p className={styles.orderFigureText}>${parseFloat(totalAmount.toFixed(2))}</p>
                    </div>
                    <div className={styles.orderFigureInfoContainer}>
                        <p className={styles.orderInfoText}>Shipping</p>
                        <p className={styles.orderFigureText}>${parseFloat(shippingCharges.toFixed(2))}</p>
                    </div>
                    <div className={styles.orderFigureInfoContainer}>
                        <p className={styles.orderInfoText}>Tax</p>
                        <p className={styles.orderFigureText}>${parseFloat(taxes.toFixed(2))}</p>
                    </div>
                </div>
                <div className={styles.totalSection}>
                    <p>Total Price: </p>
                    <p>${parseFloat(totalPrice.toFixed(2))}</p>
                </div>
                <button onClick={orderComplete ? placeOrder : () => {}} className={`${styles.checkoutButton} ${orderComplete && styles.checkoutButtonActive}`}><img className={styles.btnImage} src="/images/product/checkOut.svg"/>CHECKOUT</button>
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