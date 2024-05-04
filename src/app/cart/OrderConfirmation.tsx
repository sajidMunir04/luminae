import { CartProduct } from "./CartProduct";
import { OrderData } from "./OrderData";
import OrderItem from "./OrderItem";
import { Props } from "./Props";
import styles from "./OrderConfirmation.module.css";

function OrderConfirmation(props: Props) {
    return (<div className={styles.container}>
        <div className={styles.shoppingItemSection}>
            <p>Cart Items</p>
            <div className={styles.orderProductsContainerParent}>
                <div className={styles.orderProductsContainer}>
                    {props.orderData.cartProducts.map((product) => <OrderItem cartProduct={product}/>)}
                </div>
            </div>
        </div>
        <div className={styles.serviceSection}>
            <p>Payment Method</p>
            <div className={styles.serviceDetailContainer}>
                <p>{props.orderData.paymentServiceInfo.paymentService}</p>
                <div>
                    <img src={props.orderData.paymentServiceInfo.paymentServiceImageLink} alt="payment service logo"/>    
                </div>
            </div>
        </div>
        <div className={styles.serviceSection}>
            <p>Shipping Service</p>
            <div className={styles.serviceDetailContainer}>
                <p>{props.orderData.shippingServiceInfo.shippingService}</p>
                <div>
                    <img src={props.orderData.shippingServiceInfo.shippingServiceImageLink} alt="shipping service logo"/>
                </div>
            </div>
        </div>
        <div>
            <div className={styles.infoContainer}>
                <p>Name</p>
                <p>{props.orderData.firstName + ' ' + props.orderData.lastName}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Country</p>
                <p>{props.orderData.country}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Address</p>
                <p>{props.orderData.address}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>City</p>
                <p>{props.orderData.region}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Phone</p>
                <p>{props.orderData.phoneNumber}</p>
            </div>
        </div>

    </div>);
}

export default OrderConfirmation;