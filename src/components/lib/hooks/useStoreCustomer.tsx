import { OrderFormData } from "@/components/cart/OrderFormData";
import { setCookie } from "cookies-next";


export function useStoreCustomer(orderForm : OrderFormData){

    const names = orderForm.customerName.split(' ');

    const customerData : CustomerInfo = {
        customerEmail: orderForm.customerEmail,
        customerFirstName: names[0],
        customerLastName: names[1],
        customerPhone: orderForm.customerPhone,
        customerAddress: orderForm.customerAddress,
        customerRegion: orderForm.customerRegion,
        customerCountry: orderForm.customerCountry
    }
    setCookie('customerInfo', JSON.stringify(customerData));
}

export interface CustomerInfo {
    customerEmail: string,
    customerFirstName: string,
    customerLastName: string,
    customerPhone: string,
    customerAddress: string,
    customerRegion: string,
    customerCountry: string
}