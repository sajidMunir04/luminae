import { Product } from "@/app/utils/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductDisplayPage from "@/app/products/ProductPage";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import FooterTemplate from "@/app/shared/FooterTemplate";
import ProductCategoriesManager from "@/app/shared/ProductCategoriesManager";
import { getCookie, setCookie } from "cookies-next";
import Head from "next/head";
import { ProductReview } from "@/app/products/ProductReview";


function ProductPage() {
    const router = useRouter();
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
        productModel: "",
        previousPrice: 0,
        discount: 0,
        inventoryCount: []
    }
    const [product,setProduct] = useState<Product>(defaultProduct);
    
    useEffect(() => {
        let { productPage } = router.query;
        if (productPage === undefined)
            productPage = getCookie('productPageId');
        
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
                    productModel: data.model,
                    previousPrice: 0
                };
                setProduct(product);
            }
            catch (error) {
                console.log(error);
            }
        }

        setCookie('productPageId',productPage);
        fetchData();

    },[]);

    return (<>
    <Head>
        <title>{product.name}</title>
    </Head>
    <HeaderTemplate/>
    <ProductDisplayPage product={product}/>
    <FooterTemplate/>
    </>);
}

export default ProductPage;