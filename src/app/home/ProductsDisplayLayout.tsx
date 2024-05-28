import ProductDisplayCard from "../products/ProductDisplayCard";
import ProductDisplayLayoutHeader from "./ProductDisplayLayoutHeader";
import styles from './ProductDisplayLayout.module.css';
import ProductCategoryCard from "../products/ProductCategoryCard";

function ProductsDisplayLayout()
{
    return (<div className={styles.container}>
        <div>
            <ProductDisplayLayoutHeader heading="Popular Categories" link="#" linkText="View All"/>
        </div>
        <div className={styles.content}>
        <ProductCategoryCard categoryInfo="Be your own"
            itemsDetail="All types of shirts" link={"/WOMAN/tops"} imageLink={"/images/product/categories/girl2.jpg"} color={"#Da4456"}/>
         <ProductCategoryCard categoryInfo="All Day Comfort"
            itemsDetail="Stretchable Jeans" link={"/MAN/jeans"} imageLink={"/images/product/categories/man.jpg"} color={"#005454"}/>
        </div>
    </div>);
}

export default ProductsDisplayLayout;