import { useEffect, useState } from "react";
import ProductDisplayCard from "./ProductDisplayCard";
import SearchBar from "../shared/SearchBar";
import { Product } from "../utils/Product";
import Pagination from "./Pagination";
import styles from "./ProductsBrowser.module.css";
import ModelFilter from "./filters/ModelFilter";
import StyleFilter from "./filters/StyleFilter";
import SizeFilter from "./filters/SizeFilter";
import ColorFilter from "./filters/ColorFilter";
import PriceFilter from "./filters/PriceFilter";
import { ModelDetail } from "./filters/ModelFilter";

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
    modelDetails: ModelDetail[],
    styles: string[]
}

enum ProductSortingAlgorithm {
    Relevance,
    PriceAscending,
    PriceDescending
}

function ProductsBrowser(props : Props)
{
    const [itemsPerPage,setItemPerPage] = useState(12);
    const [currentPage,setCurrentPage] = useState(1);
    const [sortingAlgorithm,setSortingAlgorithm] = useState(ProductSortingAlgorithm.Relevance);
    const [allProducts,setProducts] = useState(props.products);
    const[selectedModel,setSelectedModel] = useState('');
    const[selectedStyle,setSelectedStyle] = useState('');
    const[selectedColor,setSelectedColor] = useState('');
    const[selectedSizes,setSelectedSizes] = useState(['']);
    const[minimumPriceRange,setMinimumPrice] = useState(0);
    const[maximumPriceRange,setMaximumPrice] = useState(0);

    useEffect(() => {
        setProducts(props.products);
    }, allProducts);

    const setNewSortingAlgorithm = (algorithmType : ProductSortingAlgorithm) => {
        setSortingAlgorithm(algorithmType);
        if (sortingAlgorithm === ProductSortingAlgorithm.Relevance || true)
        {
            setProducts(props.products);   
        }
        else if (sortingAlgorithm === ProductSortingAlgorithm.PriceAscending)
        {
            setProducts(allProducts.sort((a,b) => (
                a.price - b.price
            )))   
        }
        else if (sortingAlgorithm === ProductSortingAlgorithm.PriceDescending)
        {
            setProducts(allProducts.sort((a,b) => (
                b.price - a.price
            )))   
        }
    }

    let filtersData : FiltersData = {
        minPrice: Number.MAX_VALUE,
        maxPrice: Number.MIN_VALUE,
        colors: [],
        productSizes: [],
        modelDetails: [],
        styles: []
    }

    useEffect(() => {
        allProducts.map((item) => {
            if (item.price < filtersData.minPrice)
                filtersData.minPrice = item.price;
    
            if (item.price > filtersData.maxPrice)
                filtersData.maxPrice = item.price;
    
            if (!filtersData.colors.includes(item.color))
                filtersData.colors.push(item.color);
    
            item.sizes.map(function tagChecker(tag){
                if (!filtersData.productSizes.includes(tag)){
                    filtersData.productSizes.push(tag);
                }
            })
    
            let modelAdded = false;
    
            filtersData.modelDetails.forEach(function adder(model) {
                if (model.type == item.model)
                {
                    model.quantity++;
                    modelAdded = true;
                }
            })
    
            if (!modelAdded) {
                const modelDetail : ModelDetail = {
                    type: item.model,
                    quantity: 1
                }
                filtersData.modelDetails.push(modelDetail);
            }
    
            if (!filtersData.styles.includes(item.style))
                filtersData.styles.push(item.style);
        })    
    },props.products);


    return (<div className={styles.container}>
        <div className={styles.controllerContainer}>
        <div>

        </div>
        <div>
            <select>
                <option onSelect={() => setNewSortingAlgorithm(ProductSortingAlgorithm.Relevance)}>Sort By Revelance</option>
                <option onSelect={() => setNewSortingAlgorithm(ProductSortingAlgorithm.PriceAscending)}>Sort By Price - Ascending</option>
                <option onSelect={() => setNewSortingAlgorithm(ProductSortingAlgorithm.PriceDescending)}>Sort By Price - Descending</option>
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
            <ModelFilter onModelSelect={setSelectedModel} modelDetails={filtersData.modelDetails} />
            <StyleFilter styles={filtersData.styles} onStyleSelect={setSelectedStyle} />
            <ColorFilter colors={filtersData.colors} onColorSelect={setSelectedColor} />
            <SizeFilter sizes={filtersData.productSizes} onSizeSelect={setSelectedSizes} selectedSizes={selectedSizes}/>
            <PriceFilter minimumPrice={filtersData.minPrice} maximumPrice={filtersData.maxPrice} />
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
                    index % itemsPerPage === 0 && ((index / itemsPerPage) + 1) < 5 && <li key={(index / itemsPerPage) + 1} className="page-item"><a className="page-link" onClick={() => setCurrentPage((index / itemsPerPage) + 1)} aria-disabled={true} href="#">{(index / itemsPerPage) + 1}</a></li>
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