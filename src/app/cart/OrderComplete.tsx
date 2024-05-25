import { getCookie } from "cookies-next";
import { OrderFormData } from "./OrderFormData";
import styles from "./OrderComplete.module.css";

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
    </div>);
}

export default OrderComplete;