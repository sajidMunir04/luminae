
import { setCookie } from "cookies-next";
import { routerQueryForProductPagination } from "../constants";


export function useClearRouterQuery(){
    setCookie(routerQueryForProductPagination, undefined);
}
