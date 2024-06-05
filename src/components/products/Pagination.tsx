import ProductDisplayCard from "./ProductDisplayCard";
import { Product } from "../utils/Product";
import styles from "./Pagination.module.css";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { baseURL } from "../lib/constants";

interface Props {
    itemsPerPage: number,
    products: Product[],
    currentPage: number
}


function Pagination(props : Props) {
    const startIndex =  ((props.currentPage - 1) * props.itemsPerPage);
    const endIndex = startIndex + props.itemsPerPage;

    const router = useRouter();

    const handleClick = (product : Product) => {
        setCookie('productPageId',product._id);
        const productId = product._id;
          router.push(baseURL + '/item/' + productId);
    }

    return (<div className={styles.container}>
            {props.products.map((product,index) => ((index >= startIndex && index < endIndex) && 
            <ProductDisplayCard onClick={() => handleClick(product)} key={product.images[0]} product={product}/>))}
    </div>);
}

export default Pagination;