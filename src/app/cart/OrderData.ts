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


export const defaultOrderData : OrderData = {
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
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    region: "",
    address: "",
    phoneNumber: ""
}
