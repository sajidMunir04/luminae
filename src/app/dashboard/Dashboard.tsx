"use client";

import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Orders from './Orders';
import AddProduct from "./AddProduct";
import ProductsManager from "./ProductsManager";
import { usePathname, useRouter } from "next/navigation";
import { useExtractQueryParams } from "../lib/hooks/useExtractRouterQuery";
import { getCookie, setCookie } from "cookies-next";

export default function Dashboard() {
  const router = useRouter();
  const pathName = usePathname();

  const [dashboardView,setDashboardView] = useState(DashboardView.Orders);

  const handleDashboardViewChange = (view : DashboardView) => {
    setDashboardView(view);
    const urlQuery : string = `${pathName}/?view=${view}`;
    router.push(urlQuery);
    setCookie('dashboardView',urlQuery);
  }

  useEffect(() => {
      const useSetView = () => {
          const viewData = useExtractQueryParams(getCookie('dashboardView') !== undefined ? getCookie('dashboardView') as string : pathName as string);
          handleDashboardViewChange(viewData.view as number);
      }

      setTimeout(useSetView,500);
  },[])

  return (<div className={styles.container}>
    <div className={styles.navSection}>
        <div>
          <a className={styles.goToStoreLink} href="/"><img src="/images/common/logo2.png"/></a>
        </div>
        <div className={styles.buttonsContainer}>
          <p className={styles.button} onClick={() => {handleDashboardViewChange(DashboardView.Orders)}}>Orders</p>
          <p className={styles.button} onClick={() => {handleDashboardViewChange(DashboardView.Products)}}>Products</p>
          <p className={styles.button} onClick={() => {handleDashboardViewChange(DashboardView.AddProdut)}}>Add Product</p>
        </div>
    </div>
    <div className={styles.contentSection}>
      <div className={styles.topBar}>
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