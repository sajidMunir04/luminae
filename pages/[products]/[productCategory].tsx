'use client';

import { useRouter } from "next/router";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import ProductsManager, { ProductSection, ProductsContext } from "../../src/app/utils/ProductsContext";
import FooterTemplate from "../../src/app/shared/FooterTemplate";
import HeaderTemplate from "../../src/app/shared/HeaderTemplate";
import ProductsCategoryBrowser from "../../src/app/shared/ProductsCategoryBrowser";
import StoreInteractionContainer from "../../src/app/shared/StoreInteractionContainer";
import ProductsBrowser from "../../src/app/products/ProductsBrowser";
import ProductPage from "../../src/app/products/ProductPage";
import '../../src/app/fonts.css';
import CartContext, { CartContextType } from "../../src/app/utils/CartContext";
import { Product } from "../../src/app/utils/Product";

function productCategory(){
    const router = useRouter();
    const { products , productCategory } = router.query;
    console.log("Section",products,productCategory);
    let filteredProducts : Product[] = [];
    const [selectedProduct,setSelectedProduct] = useState(filteredProducts[0]);
    const [isProductSelected,setProductSelectStatus] = useState(false);

    let allProductSections : ProductSection[] = [];
    useEffect(
        () => {
        const fetchData = async () => {
            try {

                const fetchQuery = '/api/fetchProducts' + `/MAN` + `/shorts`;
                console.log("Query is", fetchQuery)
                const response = await fetch(fetchQuery);
                const data = await response.json();
                filteredProducts = data.map((item: Product) => ({
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
                    reviews: item.reviews
                }));

              filteredProducts.map((item) => {
                        const modifiedImages = item.images.map((imgLink,index) => {
                            const lastIndex = index == item.images.length - 1 ? 2 : 1;
                            const final = imgLink.substring(2, imgLink.length - lastIndex);
                            return final;
                        });
                        item.images = modifiedImages;
                        
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
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          fetchData();
          
    },[])


    const handleClick = (product = filteredProducts[0]) => {
      setSelectedProduct(product);
      setProductSelectStatus(true);
    }

    return (<>
      <HeaderTemplate/>
      <StoreInteractionContainer/>
      {!isProductSelected && <ProductsBrowser onClick={handleClick} products={filteredProducts} onBack={() => {}}/>}
      {isProductSelected && <ProductPage product={selectedProduct}/>}
      <FooterTemplate/>
    </>);
}

export default productCategory;