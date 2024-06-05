import { setCookie } from "cookies-next";


export function useStoreProductPageId(productId : string){
    setCookie('productPageId',productId);
}
