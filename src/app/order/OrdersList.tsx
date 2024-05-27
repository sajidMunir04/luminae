import { useEffect, useState } from "react"
import { ordersCookie } from "../lib/constants"
import { getCookie } from "cookies-next"
import { OrderFormData } from "../cart/OrderFormData";
import styles from "./OrdersList.module.css";

function OrdersList() {

    const [orders,setOrders] = useState<OrderFormData[]>([]);

    useEffect(() => {
        const orderIds = getCookie(ordersCookie);

        const fetchOrdersData = async() => {
            const response = await fetch('/api/getOrders/' + orderIds);
            const data = await response.json();

            console.log(data.data);

            if (Array.isArray(data.data)) {
                const customerOrders : OrderFormData[] = await data.data.map((item : OrderFormData) => {
                    const orderForm : OrderFormData = {
                        products: item.products,
                        customerEmail: item.customerEmail,
                        customerName: item.customerName,
                        customerPhone: item.customerPhone,
                        customerAddress: item.customerAddress,
                        customerRegion: item.customerRegion,
                        customerCountry: item.customerCountry,
                        orderPriceTotal: item.orderPriceTotal,
                        orderShippingCharges: item.orderShippingCharges,
                        orderTaxes: item.orderTaxes,
                        shippingService: item.shippingService,
                        paymentMethod: item.paymentMethod,
                        orderDate: item.orderDate,
                        customerId: item.customerId
                    }
    
                    return orderForm;
                })
    
                console.log(customerOrders);
    
                setOrders(customerOrders);
            }
        }

        fetchOrdersData();
    },[])


    return (<div className={styles.container}>
        <h1>Your Orders</h1>
        {orders.map((order,index) => (<div className={styles.orderItem}>
            <div>
                <p>{"Order No. " + index + 1}</p>
                <p>{order.orderDate}</p>
            </div>
            <a className={styles.viewOrderButton}>View Order</a>
        </div>))}
    </div>);
}

export default OrdersList;