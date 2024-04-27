'use client';

import { createContext, useEffect, useState } from 'react';
import { Product } from './Product';
import { error, time } from 'console';


type ProductContextType = {
    products : Product[];
    productSections: ProductSection[]
}

export type ProductSection = {
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
    reviews: [''],
    sizes: [],
    color: '',
    style: '',
    model: ''
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
                const data = await response.json();
                const products: Product[] = data.map((item: Product) => ({
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

              products.map((item) => {
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
              setProducts({products : products, productSections : allProductSections});
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
