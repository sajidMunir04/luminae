"use client";

import { useRouter } from "next/router";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import FooterTemplate from "@/app/shared/FooterTemplate";
import OrderComplete from "@/app/cart/OrderComplete";


function OrderProcessed() {
    const router = useRouter();
    const { OrderProcessed } = router.query;

    return (<>
    <HeaderTemplate/>
    <OrderComplete orderId={OrderProcessed as string}/>
    <FooterTemplate/>
    </>);
}

export default OrderProcessed;