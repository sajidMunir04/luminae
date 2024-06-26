import { useRouter } from "next/router";
import HeaderTemplate from "@/components/shared/HeaderTemplate";
import FooterTemplate from "@/components/shared/FooterTemplate";
import OrderComplete from "@/components/cart/OrderComplete";
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
    <OrderComplete orderId={OrderProcessed !== undefined ? OrderProcessed as string : router.asPath.split('/')[2]}/>
    <FooterTemplate/>
    </>);
}

export default OrderProcessed;