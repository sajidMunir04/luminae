import ProductCategoryCard from "./ProductCategoryCard";
import styles from "./CategoryCardsLayout.module.css";
function CategoryCardsLayout()
{
    return (<div className={styles.container}>
        <ProductCategoryCard categoryInfo="Never-Ending Summer" 
        itemsDetail="Throwback Shirts & all day dressed"/>
        <ProductCategoryCard categoryInfo="Never-Ending Summer" 
        itemsDetail="Throwback Shirts & all day dressed"/>
    </div>);
}

export default CategoryCardsLayout;