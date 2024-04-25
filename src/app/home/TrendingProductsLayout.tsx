import ProductDisplayLayoutHeader from './ProductDisplayLayoutHeader';
import TrendingProductDisplayCard from '../products/TrendingProductDisplayCard';
import styles from './TrendingProductsLayout.module.css';

function TrendingProductsLayout()
{
    return (<div className={styles.container}>
        <div>
            <ProductDisplayLayoutHeader heading="Trending Products" link="#" linkText="View All"/>
        </div>
        <div className={styles.content}>
            <TrendingProductDisplayCard isNewArrival={true} 
            brandName="Calvin Klein" productName="Dotted dress Casual"/>
            <TrendingProductDisplayCard isNewArrival={true} 
            brandName="Calvin Klein" productName="Dotted dress Casual"/>
            <TrendingProductDisplayCard isNewArrival={true} 
            brandName="Calvin Klein" productName="Dotted dress Casual"/>
        </div>
    </div>);
}

export default TrendingProductsLayout;