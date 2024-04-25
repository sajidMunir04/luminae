import ProductDisplayCard from "../products/ProductDisplayCard";
import ProductDisplayLayoutHeader from "./ProductDisplayLayoutHeader";
import styles from './ProductDisplayLayout.module.css';

function ProductsDisplayLayout()
{
    return (<div className={styles.container}>
        <div>
            <ProductDisplayLayoutHeader heading="Top 100" link="#" linkText="View All"/>
        </div>
        <div className={styles.content}>
        </div>
    </div>);
}

export default ProductsDisplayLayout;