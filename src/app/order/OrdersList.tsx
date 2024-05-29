import { useEffect, useState } from "react"
import { ordersCookie } from "../lib/constants"
import { getCookie } from "cookies-next"
import { OrderFormData } from "../cart/OrderFormData";
import styles from "./OrdersList.module.css";

function OrdersList() {

    const [orders,setOrders] = useState<OrderFormData[]>([]);
    const [hasOrders,setOrderStatus] = useState(true);

    useEffect(() => {
        const orderIds = getCookie(ordersCookie);

        if (orderIds !== undefined) {
            const fetchOrdersData = async() => {
                const response = await fetch('/api/getOrders/' + orderIds);
                const data = await response.json();
    
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
                    setOrders(customerOrders);
                }
            }
    
            fetchOrdersData();   
        }
        else {
            setOrderStatus(false);
        }
    },[])


    return (<div className={styles.container}>
        <h1 className={styles.sectionHeading}>Your Orders</h1>
        { hasOrders && orders.map((order,index) => (<div className={styles.orderItem}>
                        <div>
                            <p>{"Order No. " + (index + 1)}</p>
                            <p>{order.orderDate}</p>
                        </div>
                        <div>
                            <p>{order.customerName}</p>
                            <p>{order.customerEmail}</p>
                            <p>{order.customerPhone}</p>
                        </div>
                        <div>
                            <p>${order.orderPriceTotal.toFixed(0)}</p>
                            <p>No. of Products: {order.products.length}</p>
                        </div>
                        <a className={styles.viewOrderButton}>View Order &#10140;</a>
                    </div>))
        }
        {!hasOrders &&
            <div>
                <p>You don't have any recent Orders!</p>
            </div>
        }
    </div>);
}

export default OrdersList;