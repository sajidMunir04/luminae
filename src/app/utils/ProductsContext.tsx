import { createContext, useEffect, useState } from 'react';
import { Product } from './Product';


type ProductContextType = {
    products : Product[];
    productSections: ProductSection[]
}

type ProductSection = {
    productSection : string,
    subCategories: string[]
}

// Create a default object based on the interface
const defaultProduct: Product = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    images: [''],
    section: '',
    discount: 0,
    inventoryCount: 0,
    brandName: '',
    category: '',
    reviews: ['']
  };
  
const defaultSection: ProductSection = {
    productSection : '',
    subCategories : ['']
}

export const ProductsContext = createContext<ProductContextType>({products: [],productSections : []});

const ProductsManager = ({children}) => {
    const [allProducts,setProducts] = useState<ProductContextType>({products : [],productSections : []});
    let allProductSections : ProductSection[] = [];
    useEffect(
        () => {
        const fetchData = async () => {
            try {
              const response = await fetch('/api/fetchProducts');
              const data : Product[] = await response.json();
              console.log(allProducts.products.length);
              allProducts.products.map((item) => {
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
              console.log(allProductSections);
              setProducts({products : data, productSections : allProductSections});
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          fetchData();
          
    },[])
      
    return (<ProductsContext.Provider value={allProducts}>
        {children}
    </ProductsContext.Provider>);
}

export default ProductsManager;
