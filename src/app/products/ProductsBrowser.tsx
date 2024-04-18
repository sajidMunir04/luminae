import ProductDisplayCard from "../home/ProductDisplayCard";
import { Product } from "../utils/Product";
import styles from "./ProductsBrowser.module.css";

interface Props {
    products : Product[]
}

function ProductsBrowser(props : Props)
{
    return (<div className={styles.container}>
    <div>

    </div>
    <div className={styles.productsContainer}>
        {props.products.map((product) => (<ProductDisplayCard key={product.images[0]} imageLink={product.images[0]} 
        reviewRating={5} price={product.price} name={product.name} brandName={product.brandName} 
        currentPrice={product.price - (Math.random() * product.price * 0.5)} 
        _id={product._id} description={product.description} images={product.images} 
        category={product.category} section={product.section}/> ))}
    </div>
    </div>);
}

export default ProductsBrowser;