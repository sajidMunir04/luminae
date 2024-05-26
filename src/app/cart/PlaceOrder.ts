import { setCookie } from "cookies-next";
import { OrderFormData, ProductOrderDetail } from "./OrderFormData";
import { OrderedProduct } from "./OrderedProduct";
import { OrderData } from "./OrderData";
import { useGetCurrentDate } from "../lib/hooks/useGetCurrentDate";

export default async function placeOrder(orderData : OrderData,totalPrice : number,shippingCharges :number,taxes: number) {
    const productDetailsForOrder : ProductOrderDetail[] = [];
    for (let i = 0; i < orderData.cartProducts.length; i++)
    {
        const productDetail : ProductOrderDetail = {
            _id: orderData.cartProducts[i].product._id,
            name: orderData.cartProducts[i].product.name,
            quantity: orderData.cartProducts[i].quantity,
            unitPrice: orderData.cartProducts[i].product.price,
            size: ""
        }
        productDetailsForOrder.push(productDetail);
    }

    const orderFormData : OrderFormData = {
        products: productDetailsForOrder,
        customerEmail: orderData.email,
        customerName: orderData.firstName + ' ' + orderData.lastName,
        customerPhone: orderData.phoneNumber,
        customerAddress: orderData.address,
        customerRegion: orderData.region,
        customerCountry: orderData.country,
        orderPriceTotal: totalPrice,
        orderShippingCharges: shippingCharges,
        orderTaxes: taxes,
        shippingService: orderData.shippingServiceInfo,
        paymentMethod: orderData.paymentServiceInfo,
        orderDate: useGetCurrentDate(),
        customerId: "userId as string"
    }

    setCookie('order',orderFormData);

    const order = await fetch('api/postOrder',{
        method: "POST",
        body: JSON.stringify(orderFormData)
    });

    const orderedProducts : OrderedProduct[] = orderData.cartProducts.map(function mapData(item) {
        const orderedProduct : OrderedProduct ={
            _id: item.product._id,
            size: item.size,
            quantity: item.quantity
        }
        return orderedProduct;
    });

    const result = await fetch('/api/updateProductsDatabase',{
        method: "POST",
        body : JSON.stringify(orderedProducts)
    })
    
    const updatedData = await result.json();
    console.log(updatedData);
    const data = await order.json();
    return true;
}