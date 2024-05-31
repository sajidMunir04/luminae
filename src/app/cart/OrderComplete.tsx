import { getCookie } from "cookies-next";
import { OrderFormData } from "./OrderFormData";
import styles from "./OrderComplete.module.css";
import Link from "next/link";

interface Props {
    orderId : string
}

function OrderComplete(props : Props) {

    const orderDataRaw = getCookie('order');
    const orderData : OrderFormData = JSON.parse(orderDataRaw as string);

    return (<div className={styles.container}>
        <h1>Thanks for your Order</h1>
        <p>Your order id is {props.orderId}</p>
        <div>
            <p>Order Total:      {orderData.orderPriceTotal}</p>
            <p>Delivered To:     {orderData.customerName}</p>
        </div>
        <div className={styles.allOrderInfoContainer}>
            <p>You can view all your orders here:</p>
            <Link className={styles.orderPageLink} href="/ordersDetail">My Orders</Link>
        </div>
    </div>);
}

export default OrderComplete;