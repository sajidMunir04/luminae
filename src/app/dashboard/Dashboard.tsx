"use client";

import { useState } from "react";
import styles from "./Dashboard.module.css";
import Orders from './Orders';
import AddProduct from "./AddProduct";
import ProductsManager from "./ProductsManager";

export default function Dashboard() {

  const [dashboardView,setDashboardView] = useState(DashboardView.Orders);


  return (<div className={styles.container}>
    <div className={styles.topBar}>

    </div>
    <div className={styles.contentSection}>
      <div className={styles.buttonsContainer}>
        <p className={styles.button} onClick={() => {setDashboardView(DashboardView.Orders)}}>Orders</p>
        <p className={styles.button} onClick={() => {setDashboardView(DashboardView.Products)}}>Products</p>
        <p className={styles.button} onClick={() => {setDashboardView(DashboardView.AddProdut)}}>Add Product</p>
      </div>
      <div className={styles.infoContainer}>
        {dashboardView === DashboardView.Orders && <Orders/>}
        {dashboardView === DashboardView.AddProdut && <AddProduct/>}
        {dashboardView === DashboardView.Products && <ProductsManager/>}
      </div>
    </div>
  </div>);
}

enum DashboardView{
  Orders,
  Products,
  AddProdut
}