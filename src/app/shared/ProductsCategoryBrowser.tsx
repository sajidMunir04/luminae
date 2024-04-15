import React, { useContext, useState } from 'react';
import styles from './ProductsCategoryBrowser.module.css';
import { ProductsContext } from '../utils/ProductsContext';
import ProductSubCatrgories from '../products/ProductSubCategories';

function ProductsCategoryBrowser()
{
    const productContext = useContext(ProductsContext);
    return (<div className={styles.container}>
        {productContext.productSections.map((item) => (
         <div key={item.productSection}>
            <div><p key={item.productSection + 'as'}>{item.productSection}</p></div>
            <ProductSubCatrgories categories={item.subCategories} /></div>
        ))}
    </div>);
}

export default ProductsCategoryBrowser;