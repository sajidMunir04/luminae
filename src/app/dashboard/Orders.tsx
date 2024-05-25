"use client";   

import { useEffect, useState } from "react";
import { OrderFormData } from "../cart/OrderFormData";
import styles from "./Orders.module.css";


function Orders() {

    const [ordersData,setOrdersData] = useState<OrderFormData[]>([]);

    useEffect(() => {
        const fetchOrdersData = async() => {
            const response = await fetch('/api/getRecentOrders');
            const data = await response.json();
            console.log(data);
            const {orders} = data;
            console.log(orders);
            const formattedData : OrderFormData[] = orders.map((item : OrderFormData) => {
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

            setOrdersData(formattedData);
        }

        fetchOrdersData();
    },[])


    return (<table className={styles.table}>
            <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
                <th className={styles.orderDateSection}>Order Date</th>
                <th className={styles.customerNameSection}>Customer Name</th>
                <th className={styles.totalAmountSection}>Total Amount</th>
                <th className={styles.totalProductsSection}>Total Products</th>
                <th className={styles.contactNumberSection}>Contact Number</th>
                <th className={styles.emailSection}>Customer Email</th>    
            </tr>
            </thead>
            <tbody className={styles.tableBody}>
            {
                ordersData.map((item) => (
                    <tr className={styles.tableRow}>
                        <td className={styles.orderDateSection}>{item.orderDate}</td>
                        <td className={styles.customerNameSection}>{item.customerName}</td>
                        <td className={styles.totalAmountSection}>{item.orderPriceTotal}</td>
                        <td className={styles.totalProductsSection}>{item.products?.length}</td>
                        <td className={styles.contactNumberSection}>{item.customerPhone}</td>
                        <td className={styles.emailSection}>{item.customerEmail}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>);
}

export default Orders;