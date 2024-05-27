import { useState, useEffect } from "react";
import { ProductSection } from "../shared/ProductCategoriesManager";
import { Product } from "../utils/Product";

interface Props {
    products: string,
    productCategory: string
}

function ProductBrowser(props : Props) {
    let filteredProducts : Product[] = [];
    const [allProducts,setProducts] = useState(filteredProducts);
    let allProductSections : ProductSection[] = [];
    useEffect(
        () => {
        const fetchData = async () => {
            try {
                const fetchQuery = `/api/fetchProducts/${props.products}/${props.productCategory}`;
                const response = await fetch(fetchQuery);
                const data = await response.json();
                filteredProducts = data.map((item: Product) => {
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
                    model: item.model,
                    reviews: item.reviews
                }
                console.log(item);
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
    },[props.products, props.productCategory])

    return (<div>
        
    </div>);
}