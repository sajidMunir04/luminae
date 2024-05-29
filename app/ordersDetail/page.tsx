"use client";

import OrdersList from "@/app/order/OrdersList";
import Head from "next/head";

function ordersDetail() {
    return (<>
        <Head>
            <title>My Orders</title>
        </Head>
        <OrdersList/>
    </>);
}

export default ordersDetail;