import ProductCategoryCard from "../products/ProductCategoryCard";
import styles from './FeaturedCategoriesLayout.module.css';
import ProductDisplayLayoutHeader from "./ProductDisplayLayoutHeader";

function FeaturedCategoriesLayout()
{
    return (<div className={styles.container}>
        <div>
            <ProductDisplayLayoutHeader heading="Trending Categories" link="#" linkText="View All"/>
        </div>
        <div className={styles.contentContainer}>
        <ProductCategoryCard categoryInfo="Never-Ending Summer"
            itemsDetail="Super Comfort Dress" link={"/WOMAN/dresses"} imageLink={"/images/product/categories/girl1.jpg"}/>
         <ProductCategoryCard categoryInfo="Famous Girls"
            itemsDetail="Premium Designer Wear" link={"/WOMAN/skirts"} imageLink={"/images/product/categories/girl.jpg"}/>
        </div>
    </div>);
}

export default FeaturedCategoriesLayout;