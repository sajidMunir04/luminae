import { Product } from "@/app/utils/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductPage from "@/app/products/ProductPage";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import FooterTemplate from "@/app/shared/FooterTemplate";
import ProductCategoriesManager from "@/app/shared/ProductCategoriesManager";


export default function productPage() {
    const router = useRouter();
    const { productPage } = router.query;
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
        model: "",
        previousPrice: 0,
        discount: 0,
        inventoryCount: []
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
                    reviews: data.reviews,
                    previousPrice: 0
                };
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
    <ProductCategoriesManager/>
    <ProductPage product={product}/>
    <FooterTemplate/>
    </>);
}