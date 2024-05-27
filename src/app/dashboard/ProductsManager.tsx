import { useState, useEffect } from "react";
import { ProductClassifcation, ProductSection } from "../shared/ProductCategoriesManager";
import { Product } from "../utils/Product";
import ProductSubCatergories from "../products/ProductSubCategories";


function ProductsManager() {

    let allProductSections : ProductSection[] = [];
    const empty : ProductSection[] = [{
        productSection: '',
        subCategories: []
    }]
    const [productSections,setProducts] = useState(empty);
    useEffect(
        () => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/fetchProductsClassifcation');
                const data = await response.json();
                const products: ProductClassifcation[] = data.map((item: ProductClassifcation) => ({
                    category: item.category,
                    section: item.section
                }));

              products.map((item) => {
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
              setProducts(allProductSections);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          fetchData();
          
    },[])

    const openProductBrowser = (section: string,category : string) => {
        
    }

    return (<div>
            {productSections.map((productSection) => <div>
                <h3>{productSection.productSection}</h3>
                {productSection.subCategories.map((category) => (<button onClick={() => {}}>{category}</button>))}
            </div>)}       
    </div>);
}

export default ProductsManager;