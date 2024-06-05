import { PaymentServiceInfo } from "./PaymentServiceInfo"
import { ShippingServiceInfo } from "./ShippingServiceInfo"

export interface ProductOrderDetail{
    _id: string,
    imageLink: string,
    name: string,
    size: string,
    quantity: number,
    unitPrice: number,
    color: string
}


export interface OrderFormData {
    products : ProductOrderDetail[],
    customerEmail: string,
    customerName: string,
    customerPhone: string,
    customerAddress: string,
    customerRegion: string,
    customerCountry: string,
    orderPriceTotal: number,
    orderShippingCharges: number,
    orderTaxes: number,
    shippingService: ShippingServiceInfo,
    paymentMethod: PaymentServiceInfo,
    orderDate: string,
    customerId : string,
    orderId?: string
}

