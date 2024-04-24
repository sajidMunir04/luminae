"use client";

import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './ProductsCategoryBrowser.module.css';
import { ProductSection, ProductsContext } from '../utils/ProductsContext';
import ProductSubCatrgories from '../products/ProductSubCategories';


interface ProductClassifcation {
    section: string,
    category: string
}

function ProductsCategoryBrowser()
{
    const [isHovered,setHoverState] = useState(false);
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
                console.log(response);
                const data = await response.json();
                console.log(data);
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
    return (<div className={styles.container}>
        {productSections.map((item) => (
         <div key={item.productSection}>
            <div onMouseOver={() =>setHoverState(true)}><p key={item.productSection + 'as'}>{item.productSection}</p></div>
            {isHovered && <ProductSubCatrgories mainCategory={item.productSection} onMouseLeave={() =>setHoverState(false)}  categories={item.subCategories} />}</div>
        ))}
    </div>);
}

export default ProductsCategoryBrowser;