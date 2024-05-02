import { OrderData } from "./OrderData";

export interface Props{
    orderData: OrderData,
    setOrderData: (data: OrderData) => void
}