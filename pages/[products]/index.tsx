import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ProductPage from "../../src/app/products/ProductPage";
import ProductsBrowser from "../../src/app/products/ProductsBrowser";
import FooterTemplate from "../../src/app/shared/FooterTemplate";
import HeaderTemplate from "../../src/app/shared/HeaderTemplate";
import StoreInteractionContainer, { ProductSection } from "../../src/app/shared/ProductCategoriesManager";
import NoProductFound from "../../src/app/products/NoProductFound";
import { Product } from "../../src/app/utils/Product";



function Index() {
    const router = useRouter();
    console.log(router.query);
    const { products } = router.query;
    let filteredProducts : Product[] = [];
    const [allProducts,setProducts] = useState(filteredProducts);
    let allProductSections : ProductSection[] = [];
    let resultFinalized : boolean = false;
    useEffect(
        () => {
        const fetchData = async () => {
            try {
                const fetchQuery = `/api/searchProducts/` + products;
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
                    style: item.style,
                    color: item.color,
                    productModel: item.productModel
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

              setProducts(filteredProducts);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

            resultFinalized = true;
          };

          setTimeout(fetchData,1);       
    },[products])

    return (<>
      <HeaderTemplate/>
      <ProductsBrowser products={allProducts} productSection={""} productCategory={""}/>
      <FooterTemplate/>
    </>);
}


export default Index;