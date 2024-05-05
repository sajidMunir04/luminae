
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

function productCategory(){
    const router = useRouter();
    const { products , productCategory } = router.query;
    let filteredProducts : Product[] = [];
    const [allProducts,setProducts] = useState(filteredProducts);
    const [selectedProduct,setSelectedProduct] = useState(filteredProducts[0]);
    const [isProductSelected,setProductSelectStatus] = useState(false);
    let allProductSections : ProductSection[] = [];
    useEffect(
        () => {
        const fetchData = async () => {
            try {
                const fetchQuery = `/api/fetchProducts/${products}/${productCategory}`;
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
                    sizes: item.sizes,
                    color: item.color,
                    style: item.style,
                    model: item.model,
                    reviews: item.reviews
                }));

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


    const handleClick = (product : Product) => {
      setSelectedProduct(product);
      setProductSelectStatus(true);
      console.log("Selected Product",product);
    }

    return (<>
      <HeaderTemplate/>
      <StoreInteractionContainer/>
      {!isProductSelected && <ProductsBrowser onClick={handleClick} products={allProducts} onBack={() => {}}/>}
      {isProductSelected && <ProductPage product={selectedProduct}/>}
      <FooterTemplate/>
    </>);
}

export default productCategory;