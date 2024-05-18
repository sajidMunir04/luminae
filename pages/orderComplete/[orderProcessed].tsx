import { Product } from "@/app/utils/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductPage from "@/app/products/ProductPage";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import FooterTemplate from "@/app/shared/FooterTemplate";
import ProductCategoriesManager from "@/app/shared/ProductCategoriesManager";


export default function orderProcessed() {
    const router = useRouter();
    const { orderProcessed } = router.query;

    return (<>
    <HeaderTemplate/>
    <ProductCategoriesManager/>
    <div>
        <h1>Thank you for your order!</h1>
        <p>Your order Id is: {orderProcessed}</p>
    </div>
    <FooterTemplate/>
    </>);
}