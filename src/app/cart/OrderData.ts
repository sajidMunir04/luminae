import { useGetCustomer } from "../lib/hooks/useGetCustomer";
import { Product } from "../utils/Product";
import { CartProduct } from "./CartProduct";
import { PaymentServiceInfo } from "./PaymentServiceInfo";
import { ShippingServiceInfo } from "./ShippingServiceInfo";

export interface OrderData{
    cartProducts: CartProduct[];
    shippingServiceInfo: ShippingServiceInfo;
    paymentServiceInfo: PaymentServiceInfo
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    region: string;
    address: string;
    phoneNumber: string;
}

export const getDefaultOrderData = () => {

    const customerInfo = useGetCustomer();

    const defaultOrderData : OrderData = {
        cartProducts: [],
        paymentServiceInfo: {
            paymentService: "",
            paymentServiceImageLink: "",
            info: ""
        },
        shippingServiceInfo: {
            shippingService: "",
            shippingServiceImageLink: "",
            deliveryTime: "",
            shippingCost: 0,
            hasInsurancePolicy: false
        },
        email: customerInfo.customerEmail,
        firstName: customerInfo.customerFirstName,
        lastName: customerInfo.customerLastName,
        country: customerInfo.customerCountry,
        region: customerInfo.customerRegion,
        address: customerInfo.customerAddress,
        phoneNumber: customerInfo.customerPhone
    }

    return defaultOrderData;
} 
