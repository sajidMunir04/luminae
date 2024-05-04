import { CartData } from "../lib/store/useCartStore";

export interface UserProfile {
    name: string,
    email: string,
    profileImageLink: string,
    cartData: CartData
    products: string[]
}