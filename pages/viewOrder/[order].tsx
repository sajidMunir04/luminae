import { OrderFormData } from "@/app/cart/OrderFormData";
import { orderIdCookie } from "@/app/lib/constants";
import CustomerOrder from "@/app/order/CustomerOrder";
import FooterTemplate from "@/app/shared/FooterTemplate";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import { getCookie, setCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


function Order() {
    const router = useRouter();
    let {Order} = router.query;
    const [orderForm,setOrderForm] = useState<OrderFormData>();
    
    useEffect(() => {
        if (Order === undefined)
            Order = getCookie(orderIdCookie) as string;
        
        const fetchData = async() => {
            try {
                const response = await fetch('/api/getOrders/' + Order);
                const data = await response.json();
                const orderFormData = data.data[0];
                console.log(data,orderFormData);
                const orderForm : OrderFormData = {
                    products: orderFormData.products,
                    customerEmail: orderFormData.customerEmail,
                    customerName: orderFormData.customerName,
                    customerPhone: orderFormData.customerPhone,
                    customerAddress: orderFormData.customerAddress,
                    customerRegion: orderFormData.customerRegion,
                    customerCountry: orderFormData.customerCountry,
                    orderPriceTotal: orderFormData.orderPriceTotal,
                    orderShippingCharges: orderFormData.orderShippingCharges,
                    orderTaxes: orderFormData.orderTaxes,
                    shippingService: orderFormData.shippingService,
                    paymentMethod: orderFormData.paymentMethod,
                    orderDate: orderFormData.orderDate,
                    customerId: orderFormData.customerId,
                    orderId: orderFormData._id
                };
                setOrderForm(orderForm);
            }
            catch (error) {
                console.log(error);
            }
        }

        setTimeout(fetchData,150);

    },[Order?.length]);

    return (<>
    <Head>
        <title>Viewing Order Dated: {orderForm?.orderDate}</title>
    </Head>
    <HeaderTemplate/>
    <CustomerOrder orderform={orderForm as OrderFormData}/>
    <FooterTemplate/>
    </>);
}

export default Order;