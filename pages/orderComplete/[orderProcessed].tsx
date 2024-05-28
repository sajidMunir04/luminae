import { Product } from "@/app/utils/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductPage from "@/app/products/ProductPage";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import FooterTemplate from "@/app/shared/FooterTemplate";
import ProductCategoriesManager from "@/app/shared/ProductCategoriesManager";
import OrderComplete from "@/app/cart/OrderComplete";


export default function orderProcessed() {
    const router = useRouter();
    const { orderProcessed } = router.query;

    return (<>
    <HeaderTemplate/>
    <OrderComplete orderId={orderProcessed as string}/>
    <FooterTemplate/>
    </>);
}