import ProductDisplayCard from "./ProductDisplayCard";
import ProductDisplayLayoutHeader from "./ProductDisplayLayoutHeader";
import styles from './ProductDisplayLayout.module.css';

function ProductsDisplayLayout()
{
    return (<div className={styles.container}>
        <div>
            <ProductDisplayLayoutHeader heading="Top 100" link="#" linkText="View All"/>
        </div>
        <div className={styles.content}>
            <ProductDisplayCard brandName='Mango' productName='Kimono & Caftan - Black - Regular fit' 
            productRating={5} reviewCount={325} currentPrice={228} originalPrice={290}/>
            <ProductDisplayCard brandName='Mango' productName='Kimono & Caftan - Black - Regular fit' 
            productRating={5} reviewCount={325} currentPrice={228} originalPrice={290}/>
            <ProductDisplayCard brandName='Mango' productName='Kimono & Caftan - Black - Regular fit' 
            productRating={5} reviewCount={325} currentPrice={228} originalPrice={290}/>
            <ProductDisplayCard brandName='Mango' productName='Kimono & Caftan - Black - Regular fit' 
            productRating={5} reviewCount={325} currentPrice={228} originalPrice={290}/>
        </div>
    </div>);
}

export default ProductsDisplayLayout;