"use client";

import Link from 'next/link';
import styles from './ProductCategoriesManager.module.css';
import { useEffect, useState } from 'react';
import ProductSubCatergories from '../products/ProductSubCategories';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export interface ProductClassifcation {
    section: string,
    category: string
}

export type ProductSection = {
    productSection : string,
    subCategories: string[]
}

function ProductCategoriesManager()
{
    const [dataFetched,setDataStatus] = useState(false);

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

            setDataStatus(true);
          };

          fetchData();
          
    },[])

    return (<div className={styles.container}>
                {!dataFetched && <div className={styles.progressContainer}>
                <Box sx={{ margin: 'auto', display: 'flex', height: '100px', width : '100px' }}>
                                    <CircularProgress />
                                </Box>
                                </div>}
                            {productSections.map((categorySection) => (
                <ProductSubCatergories key={categorySection.productSection} mainCategory={categorySection.productSection} categories={categorySection.subCategories}/>))}
        </div>);
}

export default ProductCategoriesManager;