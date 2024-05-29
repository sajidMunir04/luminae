import { Product } from "@/app/utils/Product";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


function order() {
    const router = useRouter();

    const [product,setProduct] = useState<Product>();
    
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

        setCookie('productPageId',productPage);
        fetchData();

    },[]);
}

export default order;