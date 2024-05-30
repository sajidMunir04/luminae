
import { useRouter } from "next/router";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import FooterTemplate from "../../src/app/shared/FooterTemplate";
import HeaderTemplate from "../../src/app/shared/HeaderTemplate";
import StoreInteractionContainer, { ProductSection } from "../../src/app/shared/ProductCategoriesManager";
import ProductsBrowser from "../../src/app/products/ProductsBrowser";
import ProductPage from "../../src/app/products/ProductPage";
import '../../src/app/fonts.css';
import { Product } from "../../src/app/utils/Product";
import '../../src/app/globals.css';
import Head from "next/head";

function productCategory(){
    const router = useRouter();
    const { products , productCategory } = router.query;
    let filteredProducts : Product[] = [];
    const [allProducts,setProducts] = useState(filteredProducts);
    let allProductSections : ProductSection[] = [];
    useEffect(
        () => {
        const fetchData = async () => {
            try {
                const fetchQuery = `/api/fetchProducts/${products}/${productCategory}`;
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
    },[products, productCategory])

    return (<>
      <Head>
        <title>{products} - {productCategory}</title>
      </Head>
      <HeaderTemplate/>
      <ProductsBrowser products={allProducts} productSection={products as string} productCategory={productCategory as string}/>
      <FooterTemplate/>
    </>);
}

export default productCategory;