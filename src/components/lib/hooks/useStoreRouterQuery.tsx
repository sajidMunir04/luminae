import { setCookie } from "cookies-next";
import { routerQueryForProductPagination } from "../constants";


export function useStoreRouterQuery(routerQuery){
    setCookie(routerQueryForProductPagination, routerQuery);
}
