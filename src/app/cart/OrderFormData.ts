export interface ProductOrderDetail{
    _id: string,
    name: string,
    quantity: number,
    unitPrice: number
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
}

