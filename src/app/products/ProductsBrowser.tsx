import { useState } from "react";
import ProductDisplayCard from "../home/ProductDisplayCard";
import SearchBar from "../shared/SearchBar";
import { Product } from "../utils/Product";
import Pagination from "./Pagination";
import styles from "./ProductsBrowser.module.css";

interface Props {
    products : Product[],
    onClick: (arg0?: any) => void,
    onBack: () => void
}

function ProductsBrowser(props : Props)
{
    const [itemsPerPage,setItemPerPage] = useState(12);
    const [currentPage,setCurrentPage] = useState(1);

    return (<div className={styles.container}>
    <div>
        <div>
            <SearchBar/>
        </div>
        <div>

        </div>
    </div>
    <div className={styles.productsContainer}>
        <Pagination onClick={() => props.onClick()} products={props.products} itemsPerPage={itemsPerPage} currentPage={currentPage}/>
    </div>
    </div>);
}

export default ProductsBrowser;