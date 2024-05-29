"use client";

import OrdersList from "@/app/order/OrdersList";
import FooterTemplate from "@/app/shared/FooterTemplate";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import Head from "next/head";

function ordersDetail() {
    return (<>
        <Head>
            <title>My Orders</title>
        </Head>
        <HeaderTemplate/>
        <OrdersList/>
        <FooterTemplate/>
    </>);
}

export default ordersDetail;