import { getCookie, setCookie } from "cookies-next";
import { routerQueryForProductPagination } from "../constants";


export function useGetRouterQuery(){
    return getCookie(routerQueryForProductPagination);
}
