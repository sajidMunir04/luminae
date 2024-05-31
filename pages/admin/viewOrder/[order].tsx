import { OrderFormData } from "@/app/cart/OrderFormData";
import CustomerOrder from "@/app/order/CustomerOrder";
import FooterTemplate from "@/app/shared/FooterTemplate";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import { getCookie } from "cookies-next";
import { Head } from "next/document";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


function Order() {
    const router = useRouter();
    const {Order} = router.query;
    console.log(Order);
    const [orderForm,setOrderForm] = useState<OrderFormData>();
    
    useEffect(() => {
        let { productPage } = router.query;
        if (productPage === undefined)
            productPage = getCookie('productPageId');
        
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
    <HeaderTemplate/>
    <CustomerOrder orderform={orderForm as OrderFormData}/>
    <FooterTemplate/>
    </>);
}

export default Order;