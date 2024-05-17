import ProductDisplayCard from "./ProductDisplayCard";
import { Product } from "../utils/Product";
import styles from "./Pagination.module.css";
import { useRouter } from "next/router";

interface Props {
    itemsPerPage: number,
    products: Product[],
    currentPage: number
}


function Pagination(props : Props) {
    const startIndex =  ((props.currentPage - 1) + props.itemsPerPage);
    const endIndex = startIndex + props.itemsPerPage;

    const router = useRouter();

    const handleClick = (product : Product) => {
        const productId = product._id;
          router.replace('http://localhost:3000' + '/item/' + productId);
      }

    return (<div className={styles.container}>
            {props.products.map((product,index) => ((index >= startIndex && index < endIndex) && 
            <ProductDisplayCard onClick={() => handleClick(product)} key={product.images[0]} product={product}/>))}
    </div>);
}

export default Pagination;