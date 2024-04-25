import { useState } from "react";
import ProductDisplayCard from "./ProductDisplayCard";
import SearchBar from "../shared/SearchBar";
import { Product } from "../utils/Product";
import Pagination from "./Pagination";
import styles from "./ProductsBrowser.module.css";

interface Props {
    products : Product[],
    onClick: (product: Product) => void,
    onBack: () => void
}

interface FiltersData {
    minPrice: number,
    maxPrice: number,
    colors: string[],
    productSizes: string[],
    models: string[],
    styles: string[]
}

function ProductsBrowser(props : Props)
{
    const [itemsPerPage,setItemPerPage] = useState(12);
    const [currentPage,setCurrentPage] = useState(1);

    const filtersData : FiltersData = {
        minPrice: Number.MAX_VALUE,
        maxPrice: Number.MIN_VALUE,
        colors: [],
        productSizes: [],
        models: [],
        styles: []
    }
    console.log(props.products.length);
    props.products.map((item) => {
        if (item.price < filtersData.minPrice)
            filtersData.minPrice = item.price;

        if (item.price < filtersData.maxPrice)
            filtersData.maxPrice = item.price;

        if (!filtersData.colors.includes('a'))
            filtersData.colors.push('');

        if (!filtersData.productSizes.includes('a'))
            filtersData.colors.push('');

        if (!filtersData.models.includes('a'))
            filtersData.models.push('');

        if (!filtersData.styles.includes('a'))
            filtersData.styles.push('');
    })

    return (<div className={styles.container}>
        <div className={styles.controllerContainer}>
        <div>

        </div>
        <div>
            <select>
                <option>Sort By Revelance</option>
                <option>Sort By Price - Ascending</option>
                <option>Sort By Price - Descending</option>
            </select>
            <label>Items Per Page
            <select>
                <option onSelect={() => setItemPerPage(12)}>12</option>
                <option onSelect={() => setItemPerPage(24)}>24</option>
                <option onSelect={() => setItemPerPage(36)}>36</option>
                <option onSelect={() => setItemPerPage(48)}>48</option>
                <option onSelect={() => setItemPerPage(60)}>60</option>
            </select>
            </label>
        </div>
    </div>
    <div className={styles.mainSection}>
        <div className={styles.filtersContainer}>
            
        </div>
        <div className={styles.productsContainer}>
            <div>
                <Pagination onClick={() => props.onClick(props.products[0])} products={props.products} itemsPerPage={itemsPerPage} currentPage={currentPage}/>
            </div>
            <ul className={styles.paginationControlContainer}>
                <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                </li>
                {props.products.map((item,index) => (
                    index % itemsPerPage === 0 && ((index / itemsPerPage) + 1) < 5 && <li className="page-item"><a className="page-link" onClick={() => setCurrentPage((index / itemsPerPage) + 1)} aria-disabled={true} href="#">{(index / itemsPerPage) + 1}</a></li>
                )) }
                <li className="page-item">
                <a className="page-link" href="#">Next</a>
                </li>
            </ul>
        </div>
    </div>
    </div>);
}

export default ProductsBrowser;