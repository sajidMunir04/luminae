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
    const startIndex =  ((props.currentPage - 1) + props.itemsPerPage);
    const endIndex = startIndex + props.itemsPerPage;

    console.log("Pagination",startIndex,endIndex);

    return (<div className={styles.container}>
            {props.products.map((product,index) => ((index >= startIndex && index < endIndex) && 
            <ProductDisplayCard onClick={() => props.onClick(product)} key={product.images[0]} product={product}/>))}
    </div>);
}

export default Pagination;