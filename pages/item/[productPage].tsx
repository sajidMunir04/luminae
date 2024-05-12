import { Product } from "@/app/utils/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductPage from "@/app/products/ProductPage";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import FooterTemplate from "@/app/shared/FooterTemplate";


export default function productPage() {

    console.log("Correct page is rendering!");

    const router = useRouter();
    const { productPage } = router.query;
    console.log(productPage);
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
                    body: productPage as string
                });
                const data = await response.json();
                const product : Product = {
                    _id: data._id,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    images: data.images,
                    discount: data.discount,
                    inventoryCount: data.inventoryCount,
                    brandName: data.brandName,
                    category: data.category,
                    section: data.section,
                    sizes: data.sizes,
                    color: data.color,
                    style: data.style,
                    model: data.model,
                    reviews: data.reviews
                };
                console.log(data);
                setProduct(product);
            }
            catch (error) {
                console.log(error);
            }
        }

        setTimeout(fetchData,500);

    },[]);

    return (<>
    <HeaderTemplate/>
    {product !== null && <ProductPage product={product}/>}
    <FooterTemplate/>
    </>);
}