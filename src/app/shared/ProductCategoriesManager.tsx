import Link from 'next/link';
import styles from './ProductCategoriesManager.module.css';
import { useContext, useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { useCartStore } from '../lib/store/useCartStore';
import ProductSubCatrgories from '../products/ProductSubCategories';

interface ProductClassifcation {
    section: string,
    category: string
}

type ProductSection = {
    productSection : string,
    subCategories: string[]
}

function ProductCategoriesManager()
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

    return (<div className={styles.container}>
            <div className={styles.categoriesButton}>
                <div>
                    
                </div>
                <p>All Categories</p>
            </div>
            <div className={styles.catergoriesSection}>
            {productSections.map((item) => (
                <div key={item.productSection}>
                    <div onMouseEnter={() =>setHoverState(true)} onMouseUp={() => setHoverState(false)}><p key={item.productSection + 'as'}>{item.productSection}</p></div>
                    {isHovered && <ProductSubCatrgories mainCategory={item.productSection} onMouseLeave={() =>setHoverState(false)}  categories={item.subCategories} />}</div>
                ))}
            </div>
    </div>);
}

export default ProductCategoriesManager;