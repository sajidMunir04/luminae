import Link from 'next/link';
import styles from './ProductCategoriesManager.module.css';
import { useContext, useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { useCartStore } from '../lib/store/useCartStore';
import ProductSubCatergories from '../products/ProductSubCategories';
import router from 'next/router';

interface ProductClassifcation {
    section: string,
    category: string
}

export type ProductSection = {
    productSection : string,
    subCategories: string[]
}

function ProductCategoriesManager()
{
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

    const handleCategoryClick = (category) => {
        router.push(category);
      };
    

    return (<div className={styles.container}>
            <div className={styles.categoriesButton}>
                <div>
                    
                </div>
                <p>All Categories</p>
            </div>
            <div className={styles.catergoriesSection}>
                {productSections.map((categorySection) => (
                <ProductSubCatergories mainCategory={categorySection.productSection} categories={categorySection.subCategories}/>))}
            </div>
        </div>);
}

export default ProductCategoriesManager;