import ProductDisplayCard from "./ProductDisplayCard";
import { Product } from "../utils/Product";
import styles from "./Pagination.module.css";

interface Props {
    itemsPerPage: number,
    products: Product[],
    currentPage: number
    onClick:(product : Product) => void
}


function Pagination(props : Props) {

    const startIndex =  ((props.currentPage - 1) * props.itemsPerPage);
    const endIndex = startIndex + props.itemsPerPage;

    return (<div className={styles.container}>
            {props.products.map((product,index) => ((index >= startIndex && index < endIndex) && <ProductDisplayCard onClick={() => props.onClick(product)} key={product.images[0]} imageLink={product.images[0]} 
            reviewRating={5} price={product.price} name={product.name} brandName={product.brandName} 
            currentPrice={product.price - (Math.random() * product.price * 0.5)} 
            _id={product._id} description={product.description} images={product.images} 
            category={product.category} section={product.section}/> ))}
    </div>);
}

export default Pagination;