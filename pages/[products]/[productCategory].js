import { useRouter } from "next/router";
import { useContext } from "react";
import {ProductsContext} from "../../src/app/utils/ProductsContext";

function productCategory(){
    const router = useRouter();
    const { products , productCategory } = router.query;
    console.log(router.query);
    return (<div>
        <h1>{productCategory}</h1>
    </div>);
}

export default productCategory;