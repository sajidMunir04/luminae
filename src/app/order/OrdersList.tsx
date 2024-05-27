import { useEffect, useState } from "react"
import { ordersCookie } from "../lib/constants"
import { getCookie } from "cookies-next"
import { OrderFormData } from "../cart/OrderFormData";

function OrdersList() {

    const [orders,setOrders] = useState<OrderFormData[]>([]);

    useEffect(() => {

        const orderIds = getCookie(ordersCookie);

        const fetchOrdersData = async() => {
            const response = await fetch('/api/getCustomerOrders' + orderIds);
            const data = await response.json();
            const customerOrders : OrderFormData[] = data.map((item : OrderFormData) => {
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

        fetchOrdersData();
    },[])


    return (<div>
        {orders.map((order,index) => (<div>
            <p>{"Order " + index + 1}</p>
        </div>))}
    </div>);
}

export default OrdersList;