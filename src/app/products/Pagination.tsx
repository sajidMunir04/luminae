import ProductDisplayCard from "./ProductDisplayCard";
import { Product } from "../utils/Product";
import styles from "./Pagination.module.css";
import { useRouter } from "next/router";
import { useStoreProductPageId } from "../lib/hooks/useStoreProductPageId";

interface Props {
    itemsPerPage: number,
    products: Product[],
    currentPage: number
}


function Pagination(props : Props) {
    const startIndex =  ((props.currentPage - 1) * props.itemsPerPage);
    const endIndex = startIndex + props.itemsPerPage;

    const router = useRouter();

    const useHandleClick = (product : Product) => {
        useStoreProductPageId(product._id);
        const productId = product._id;
          router.push('http://localhost:3000' + '/item/' + productId);
    }

    return (<div className={styles.container}>
            {props.products.map((product,index) => ((index >= startIndex && index < endIndex) && 
            <ProductDisplayCard onClick={() => useHandleClick(product)} key={product.images[0]} product={product}/>))}
    </div>);
}

export default Pagination;