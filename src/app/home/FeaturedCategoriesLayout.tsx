import ProductCategoryCard from "../products/ProductCategoryCard";
import styles from './FeaturedCategoriesLayout.module.css';

function FeaturedCategoriesLayout()
{
    return (<div className={styles.container}>
        <ProductCategoryCard categoryInfo="Never-Ending Summer" 
        itemsDetail="Throwback Shirts & all day dressed"/>
        <ProductCategoryCard categoryInfo="Never-Ending Summer" 
        itemsDetail="Throwback Shirts & all day dressed"/>
    </div>);
}

export default FeaturedCategoriesLayout;