import React, { useContext, useRef, useState } from 'react';
import styles from './ProductsCategoryBrowser.module.css';
import { ProductsContext } from '../utils/ProductsContext';
import ProductSubCatrgories from '../products/ProductSubCategories';

function ProductsCategoryBrowser()
{
    const [isHovered,setHoverState] = useState(false);
    const productContext = useContext(ProductsContext);
    return (<div className={styles.container}>
        {productContext.productSections.map((item) => (
         <div key={item.productSection}>
            <div onMouseOver={() =>setHoverState(true)}><p key={item.productSection + 'as'}>{item.productSection}</p></div>
            {isHovered && <ProductSubCatrgories mainCategory={item.productSection} onMouseLeave={() =>setHoverState(false)}  categories={item.subCategories} />}</div>
        ))}
    </div>);
}

export default ProductsCategoryBrowser;