import { useRouter } from "next/router";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import FooterTemplate from "@/app/shared/FooterTemplate";
import OrderComplete from "@/app/cart/OrderComplete";
import { getCookie, setCookie } from "cookies-next";


function OrderProcessed() {
    const router = useRouter();
    let { OrderProcessed } = router.query;

    if (OrderProcessed !== undefined)
        setCookie('orderProcessed',OrderProcessed);

    if (OrderProcessed === undefined)
        OrderProcessed = getCookie('orderProcessed') as string;

    return (<>
    <HeaderTemplate/>
    <OrderComplete orderId={OrderProcessed as string}/>
    <FooterTemplate/>
    </>);
}

export default OrderProcessed;