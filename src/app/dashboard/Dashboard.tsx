"use client";

import { useState } from "react";
import styles from "./Dashboard.module.css";
import Orders from './Orders';
import AddProduct from "./AddProduct";

export default function Dashboard() {

  const [dashboardView,setDashboardView] = useState(DashboardView.Orders);


  return (<div className={styles.container}>
    <div className={styles.topBar}>

    </div>
    <div className={styles.contentSection}>
      <div className={styles.buttonsContainer}>
        <p className={styles.button} onClick={() => {setDashboardView(DashboardView.Orders)}}>Orders</p>
        <p className={styles.button} onClick={() => {setDashboardView(DashboardView.Products)}}>Products</p>
        <p className={styles.button} onClick={() => {setDashboardView(DashboardView.Customers)}}>Customers</p>
        <p className={styles.button} onClick={() => {setDashboardView(DashboardView.Revenues)}}>Revenues</p>
      </div>
      <div className={styles.infoContainer}>
        {dashboardView === DashboardView.Orders && <Orders/>}
        {dashboardView === DashboardView.Products && <AddProduct/>}
      </div>
    </div>
  </div>);
}

enum DashboardView{
  Orders,
  Products,
  Customers,
  Revenues
}