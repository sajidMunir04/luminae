"use client";

import OrdersList from "@/components/order/OrdersList";
import FooterTemplate from "@/components/shared/FooterTemplate";
import HeaderTemplate from "@/components/shared/HeaderTemplate";
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