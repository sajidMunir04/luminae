import { OrderFormData } from "../cart/OrderFormData";
import OrderItem from "./OrderItem";
import styles from "./OrderView.module.css";

interface Props {
    orderData: OrderFormData
}


function OrderView (props : Props) {
    return (<div className={styles.container}>
        <div className={styles.shoppingItemSection}>
            <p>Cart Items</p>
            <div className={styles.orderProductsContainerParent}>
                <div className={styles.orderProductsContainer}>
                    {props.orderData.products.map((product) => <OrderItem cartProduct={product}/>)}
                </div>
            </div>
        </div>
        <div className={styles.serviceSection}>
            <p>Payment Method</p>
            <div className={styles.serviceDetailContainer}>
                <p>{props.orderData.paymentMethod.paymentService}</p>
                <div>
                    <img src={props.orderData.paymentMethod.paymentServiceImageLink} alt="payment service logo"/>    
                </div>
            </div>
        </div>
        <div className={styles.serviceSection}>
            <p>Shipping Service</p>
            <div className={styles.serviceDetailContainer}>
                <p>{props.orderData.shippingService.shippingService}</p>
                <div>
                    <img src={props.orderData.shippingService.shippingServiceImageLink} alt="shipping service logo"/>
                </div>
            </div>
        </div>
        <div>
            <div className={styles.infoContainer}>
                <p>Name</p>
                <p>{props.orderData.customerName}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Country</p>
                <p>{props.orderData.customerCountry}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Address</p>
                <p>{props.orderData.customerAddress}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>City</p>
                <p>{props.orderData.customerRegion}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Phone</p>
                <p>{props.orderData.customerPhone}</p>
            </div>
        </div>

    </div>);
}

export default OrderView;