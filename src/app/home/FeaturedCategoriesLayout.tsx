import ProductCategoryCard from "../products/ProductCategoryCard";
import styles from './FeaturedCategoriesLayout.module.css';
import ProductDisplayLayoutHeader from "./ProductDisplayLayoutHeader";

function FeaturedCategoriesLayout()
{
    return (<div className={styles.container}>
        <ProductDisplayLayoutHeader heading="Trending Categories" link="#" linkText="View All"/>
        <div className={styles.contentContainer}>
        <ProductCategoryCard categoryInfo="Never-Ending Summer"
            itemsDetail="Super Comfort Dress" link={"/WOMAN/dresses"} imageLink={"/images/product/categories/girl1.jpg"} color={"#dd00dd"}/>
         <ProductCategoryCard categoryInfo="Famous Girls"
            itemsDetail="Premium Designer Wear" link={"/WOMAN/skirts"} imageLink={"/images/product/categories/girl.jpg"} color={"#00aaff"}/>
        </div>
    </div>);
}

export default FeaturedCategoriesLayout;