import ProductPage from "@/app/products/ProductPage";
import FooterTemplate from "@/app/shared/FooterTemplate";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import { Product } from "@/app/utils/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function index() {
    const router = useRouter();
    const { productId } = router.query;
    const defaultProduct : Product = {
        _id: "",
        name: "",
        description: "",
        price: 0,
        images: [],
        brandName: "",
        category: "",
        section: "",
        sizes: [],
        color: "",
        style: "",
        model: ""
    }
    const [product,setProduct] = useState<Product>(defaultProduct);
    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('/api/getProductPage',{
                    method: "POST",
                    body: productId as string
                });
                const data = await response.json();
                console.log(data);  
                const product : Product = await JSON.parse(data);
                setProduct(product);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();

    },[product]);

    return (<>
    <HeaderTemplate/>
    {product !== undefined && <ProductPage product={product}/>}
    <FooterTemplate/>
    </>);
}