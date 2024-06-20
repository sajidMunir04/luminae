import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FooterTemplate from "../../src/components/shared/FooterTemplate";
import HeaderTemplate from "../../src/components/shared/HeaderTemplate";
import { ProductSection } from "../../src/components/shared/ProductCategoriesManager";
import ProductsBrowser from "../../src/components/products/ProductsBrowser";
import '../../src/components/fonts.css';
import { Product } from "../../src/components/utils/Product";
import '../../src/components/globals.css';
import Head from "next/head";
import { getCookie } from "cookies-next";
import { productCategoryCookie } from "@/components/lib/constants";

function ProductCategory(){
    const router = useRouter();
    let { products , ProductCategory } = router.query;

    if (router.query === undefined || products === undefined || ProductCategory === undefined){
      const storedQuery = getCookie(productCategoryCookie);
      
      if (storedQuery !== undefined && storedQuery !== null) {
          const queryParts = storedQuery.split('/');
          products = queryParts[0];
          ProductCategory = queryParts[1];
      } 
    }

    

    const [allProducts,setProducts] = useState<Product[]>([]);
    let allProductSections : ProductSection[] = [];
    useEffect(
        () => {
        let filteredProducts : Product[] = [];
        const fetchData = async () => {

            try {
                const fetchQuery = `/api/fetchProducts/${products}/${ProductCategory}`;
                const response = await fetch(fetchQuery);
                const data = await response.json();
                filteredProducts = data.data.map((item: Product) => {
                  const product : Product = {
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    previousPrice: item.previousPrice,
                    images: item.images,
                    discount: item.discount,
                    inventoryCount: item.inventoryCount,
                    brandName: item.brandName,
                    category: item.category,
                    section: item.section,
                    sizes: item.sizes,
                    color: item.color,
                    style: item.style,
                    productModel: item.productModel
                }

                return product;            
            });

              filteredProducts.map((item) => {
                        let containsSection = false;
                        allProductSections.forEach((prodSec,index) => {
                            if (prodSec.productSection == item.section)
                                {
                                    containsSection = true;

                                    if (!prodSec.subCategories.includes(item.category))
                                        prodSec.subCategories.push(item.category as string)    
                                }
                        })
                        if (!containsSection)
                        {
                                let newProductSection : ProductSection = {
                                    productSection : item.section as string,
                                    subCategories: [item.category as string]
                                }
                                allProductSections.push(newProductSection);
                        }
              })

              setProducts(filteredProducts);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          setTimeout(fetchData,250);       
    },[products, ProductCategory])

    const [pageTitle,setPageTitle] = useState<string>(`${products} - ${ProductCategory}`);

    return (<>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <HeaderTemplate/>
      <ProductsBrowser products={allProducts} productSection={products as string} productCategory={ProductCategory as string}/>
      <FooterTemplate/>
    </>);
}

export default ProductCategory;