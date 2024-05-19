"use client";

import { OrderFormData } from '../cart/OrderFormData';
import styles from "./Dashboard.module.css";
import Orders from './Orders';

export default function Dashboard({orders}) {
  return (<div className={styles.container}>
    <div className={styles.topBar}>

    </div>
    <div className={styles.contentSection}>
      <div className={styles.buttonsContainer}>
        <p className={styles.button}>Orders</p>
        <p className={styles.button}>Products</p>
        <p className={styles.button}>Customers</p>
        <p className={styles.button}>Revenues</p>
      </div>
      <div className={styles.infoContainer}>
        <Orders/>
      </div>
    </div>
  </div>);
}

export async function getServerSideProps({ req }) {
  const response = await fetch('/api/getRecentOrders');
  const data = await response.json();
  const orders : OrderFormData[] = data.map((orderData : OrderFormData) => ({
      products: orderData.products,
      customerEmail: orderData.customerEmail,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      customerRegion: orderData.customerRegion,
      customerCountry: orderData.customerCountry,
      orderPriceTotal: orderData.orderPriceTotal,
      orderShippingCharges: orderData.orderShippingCharges,
      orderTaxes: orderData.orderTaxes,
      shippingService: orderData.shippingService,
      paymentMethod: orderData.paymentMethod
  }))

  return {
    props: {
      orders: { orders },
    },
  };
}