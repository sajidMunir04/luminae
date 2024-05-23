import { Product } from "../utils/Product";

export interface CartProduct {
    product: Product,
    quantity: number,
    size: string
}