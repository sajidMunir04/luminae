"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductsBrowser from "../../src/components/products/ProductsBrowser";
import FooterTemplate from "../../src/components/shared/FooterTemplate";
import HeaderTemplate from "../../src/components/shared/HeaderTemplate";
import NoProductFound from "../../src/components/products/NoProductFound";
import { Product } from "../../src/components/utils/Product";
import Head from "next/head";



function Search() {
    const router = useRouter();
    const { Search } = router.query;
    const [products,setProducts] = useState<Product[]>([]);
    let resultFinalized : boolean = false;
    useEffect(
        () => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/searchProduct',{
                  method:"POST",
                  body: Search as string
                });
                const data = await response.json();
                const fetchedProducts = data.map((item: Product) => ({
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    images: item.images,
                    discount: item.discount,
                    inventoryCount: item.inventoryCount,
                    brandName: item.brandName,
                    category: item.category,
                    section: item.section,
                    sizes: item.sizes,
                    style: item.style,
                    color: item.color,
                    productModel: item.productModel
                }));

              setProducts(fetchedProducts);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

            resultFinalized = true;
          };

          setTimeout(fetchData,1);       
    },[Search])

    const handleClick = (product : Product) => {

    }

    return (<>
      <Head>
        <title>Search {`"${Search}"`}</title>
      </Head>
      <HeaderTemplate/>
      {products.length > 0 && <ProductsBrowser products={products} productSection={""} productCategory={""}/>}
      {(resultFinalized  && products.length == 0) && <NoProductFound searchTerm={Search as string} />}
      <FooterTemplate/>
    </>);
}


export default Search;