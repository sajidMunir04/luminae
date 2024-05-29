import { useEffect, useState } from "react";
import { useCartStore } from "../lib/store/useCartStore";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import { Product } from "../utils/Product";
import CustomerInformation from "./CustomerInformation";
import PaymentAndShipping from "./PaymentAndShipping";
import { OrderData, getDefaultOrderData} from "./OrderData";
import { CartProduct } from "./CartProduct";
import OrderConfirmation from "./OrderConfirmation";
import axios from "axios";
import { OrderFormData, ProductOrderDetail } from "./OrderFormData";
import { error } from "console";
import { useRouter } from "next/router";
import { OrderedProduct } from "./OrderedProduct";
import { useGetCurrentDate } from "../lib/hooks/useGetCurrentDate";
import { getCookie, setCookie } from "cookies-next";
import { ordersCookie } from "../lib/constants";
import { useStoreCustomer } from "../lib/hooks/useStoreCustomer";
import { Spinner } from "@radix-ui/themes";


function Cart() {
    const cartData = useCartStore(state => state.fetchData());
    const [orderTotal,setOrderTotal] = useState(0);
    const [isOrderInfoComplete,setOrderCompleteStatus] = useState(false);
    const [shippingCharges,setShippingCharges] = useState<number>(0);   
    const [taxes,setTaxes] = useState<number>(0);
    const [orderPlaced,setOrderPlaceStatus] = useState(false);
    const [totalPrice,setTotalPrice] = useState<number>(0);
    const [products,setProducts] = useState<CartProduct[]>([]);
    const [cartState,setCartState] = useState(CartState.Cart);
    const router = useRouter();

    const clearCart = useCartStore(state => state.clearCart);
    const removeProduct = useCartStore(state => state.removeFromCart);

    function checkOrderForm() {
        if (orderData.address !== "" && orderData.country !== "" && orderData.region !== ""
        && orderData.firstName !== "" && orderData.email !== "" && orderData.phoneNumber !== "" &&
           orderData.cartProducts.length > 0) {
            setOrderCompleteStatus(true);
        }
        else {
            setOrderCompleteStatus(false);
        }
    }

    async function placeOrder() {
        setOrderPlaceStatus(true);

        const productDetailsForOrder : ProductOrderDetail[] = [];
        for (let i = 0; i < orderData.cartProducts.length; i++)
        {
            const productDetail : ProductOrderDetail = {
                _id: orderData.cartProducts[i].product._id,
                name: orderData.cartProducts[i].product.name,
                quantity: orderData.cartProducts[i].quantity,
                unitPrice: orderData.cartProducts[i].product.price,
                size: orderData.cartProducts[i].size,
                imageLink: orderData.cartProducts[i].product.images[0],
                color: orderData.cartProducts[i].product.color
            }
            productDetailsForOrder.push(productDetail);
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
            orderTaxes: taxes,
            shippingService: orderData.shippingServiceInfo,
            paymentMethod: orderData.paymentServiceInfo,
            orderDate: useGetCurrentDate(),
            customerId: "userId as string"
        }

        setCookie('order',orderFormData);

        const order = await fetch('api/postOrder',{
            method: "POST",
            body: JSON.stringify(orderFormData)
        });

        const orderedProducts : OrderedProduct[] = orderData.cartProducts.map(function mapData(item) {
            const orderedProduct : OrderedProduct ={
                _id: item.product._id,
                size: item.size,
                quantity: item.quantity
            }
            return orderedProduct;
        });

        const result = await fetch('/api/updateProductsDatabase',{
            method: "POST",
            body : JSON.stringify(orderedProducts)
        })

        useStoreCustomer(orderFormData);

        const updatedData = await result.json();
        console.log(updatedData);
        const data = await order.json();
        let orders : string = getCookie(ordersCookie) as string;
        if (orders !== undefined || orders !== null)
            orders = orders + ',' + data.id;
        else
            orders = data.id;

        setCookie(ordersCookie,orders);
        await setOrderData(getDefaultOrderData());
        await clearCart();
        router.replace('/orderComplete/' + data.id);
    }

    const calculatePricing = async () => {
        const totalPrices = await orderData.cartProducts.map((item) => item.product.price * item.quantity);
        const totalPrice = await totalPrices.reduce((acc,el) => (acc + el),0);
        setOrderTotal(totalPrice);

        const shippingChargesResponse = await axios.post('api/getShippingCharges',{totalPrice});
        const shippingChargesData = await shippingChargesResponse.data;
        await setShippingCharges(shippingChargesData.shippingCharges);

        const taxesResponse = await axios.post('api/getTaxes',{totalPrice});
        const taxesData = await taxesResponse.data;
        await setTaxes(taxesData.tax);

        setTotalPrice(totalPrice + taxesData.tax + shippingChargesData.shippingCharges);
    }

    const [orderData,setOrderData] = useState(getDefaultOrderData());

    const setNewOrderData = (orderData : OrderData) => {
        checkOrderForm();
        setOrderData(orderData);
        calculatePricing();
    }

    const removeProductFromCart = (product: Product) => {
        removeProduct(product);
        const filteredProducts = (products as CartProduct[]).filter((item) => item.product._id !== product._id);
        setProducts(filteredProducts);
        const newOrderData : OrderData = orderData;
        newOrderData.cartProducts = filteredProducts;
        setNewOrderData(newOrderData);
        calculatePricing();
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
        calculatePricing(); 
    }


    useEffect(() => {
        const productsId : string[] = [];
        cartData.productsInfo.map((item) => productsId.push(item.id));
        const fetchData = async() => {
            try {
                const response = await fetch('/api/fetchCartProducts/'+ productsId);
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
                        quantity: cartData.productsInfo[index].quantity > 0 ? cartData.productsInfo[index].quantity : 1,
                        size: cartData.productsInfo[index].size
                    }
                cartProducts.push(cartProduct);
            });
            setProducts(cartProducts);
            const newOrderData : OrderData = orderData;
            newOrderData.cartProducts = cartProducts;
            setOrderData(newOrderData);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();
        calculatePricing();
    },[orderData.cartProducts.length])

    return (<div className={styles.container}>
        {orderPlaced && <Spinner/>}
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
            <div>
                {orderData.cartProducts.map((item) => <CartItem key={item.product._id} product={item.product} quantity={item.quantity}
                onProductRemove={() => removeProductFromCart(item.product)} onProductQuantityChange={onProductQuantityChange} size={item.size}/>)}
            </div>
            </div>
            </>}
            {cartState === CartState.CustomerInfo && <>
                <CustomerInformation orderData={orderData} setOrderData={setNewOrderData}/>
            </>}
            {cartState === CartState.ShippingandPayment && <>
                <PaymentAndShipping orderData={orderData} setOrderData={setNewOrderData}/>
            </>}
            {cartState === CartState.OrderConfirmation && <>
                <OrderConfirmation orderData={orderData} setOrderData={setNewOrderData}/>
            </>}
            </div>
            <div className={styles.orderInfoContainer}>
                <div className={styles.orderPricingSection}>
                    <p className={styles.orderBoxHeading}>Order Summary</p>
                    <div className={styles.orderFigureInfoContainer}>
                        <p className={styles.orderInfoText}>Price</p>
                        <p className={styles.orderFigureText}>${parseFloat(orderTotal.toFixed(2))}</p>
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
                <button onClick={isOrderInfoComplete ? placeOrder : () => {}} aria-disabled={orderPlaced} className={`${styles.checkoutButton} ${isOrderInfoComplete && styles.checkoutButtonActive}`}><img className={styles.btnImage} src="/images/product/checkOut.svg"/>CHECKOUT</button>
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