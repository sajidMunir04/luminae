import { ChangeEvent, useEffect, useState } from "react";
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
    const [products,setProducts] = useState(props.products);
    const[selectedModel,setSelectedModel] = useState('');
    const[selectedStyle,setSelectedStyle] = useState('');
    const[selectedColor,setSelectedColor] = useState('');
    const[selectedSizes,setSelectedSizes] = useState(['']);
    const[minimumPriceRange,setMinimumPrice] = useState(0);
    const[maximumPriceRange,setMaximumPrice] = useState(0);
    const defaultFilterData : FiltersData = {
        minPrice: 0,
        maxPrice: 0,
        colors: [],
        productSizes: [],
        modelDetails: [],
        styles: []
    }
    const[filtersData,setFiltersData] = useState<FiltersData>(defaultFilterData);

    const handleModelSelection = (model : string) => {
        setSelectedModel(model);
        const filteredProducts = props.products.filter((product) => product.model === model);
        setProducts(filteredProducts);
    }

    const handleStyleSelection = (style : string) => {
        setSelectedStyle(style);
        const filteredProducts = props.products.filter((product) => product.style === style);
        setProducts(filteredProducts);
    }

    const handleSizeSelection = (sizes : string[]) => {
        setSelectedSizes(sizes);
        const filteredProducts = products.filter(function checkSize(product){
            product.sizes.forEach((size) => sizes.includes(size))
        });
        setProducts(filteredProducts);
    }


    useEffect(() => {
        setProducts(props.products);
        const newFiltersData : FiltersData = {
            minPrice: 0,
            maxPrice: 0,
            colors: [],
            productSizes: [],
            modelDetails: [],
            styles: []
        }
        props.products.forEach((item) => {
            if (item.price < newFiltersData.minPrice)
                newFiltersData.minPrice = item.price;
    
            if (item.price > newFiltersData.maxPrice)
                newFiltersData.maxPrice = item.price;
    
            if (!newFiltersData.colors.includes(item.color))
                newFiltersData.colors.push(item.color);
    
            item.sizes.map(function tagChecker(tag){
                if (!newFiltersData.productSizes.includes(tag)){
                    newFiltersData.productSizes.push(tag);
                }
            })

            {
                let modelAdded = false;

                newFiltersData.modelDetails.forEach((model,index) => {
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
                    newFiltersData.modelDetails.push(modelDetail);
                }
            }
    
            if (!newFiltersData.styles.includes(item.style))
                newFiltersData.styles.push(item.style);
        })    
        setFiltersData(newFiltersData);
    }, [props.products.length]);

    const handleItemsChange = (event : ChangeEvent<HTMLSelectElement>) => {
        setItemPerPage(parseInt(event.target.value));
    }

    const handleSortAlgorithmChange = (event : ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        const enumValues = Object.values(ProductSortingAlgorithm);
        const enumValue = enumValues[value] as number;
        console.log(enumValue,typeof(enumValue));
        setSortingAlgorithm(value);
        setNewSortingAlgorithm(value);
    }

    const setNewSortingAlgorithm = (algorithmType : ProductSortingAlgorithm) => {
        if (algorithmType === ProductSortingAlgorithm.Relevance)
        {
            setProducts(props.products);
        }
        else if (algorithmType === ProductSortingAlgorithm.PriceAscending)
        {
            const filteredProducts = products.sort((a,b) => (a.price - b.price));
            setProducts(filteredProducts)   
        }
        else if (algorithmType === ProductSortingAlgorithm.PriceDescending)
        {
            const filteredProducts = products.sort((a,b) => (b.price - a.price));
            setProducts(filteredProducts)   
        }
    }

    console.log(products.length,products.length / itemsPerPage);

    return (<div className={styles.container}>
        <div className={styles.controllerContainer}>
        <div>

        </div>
        <div>
            <select value={sortingAlgorithm} onChange={handleSortAlgorithmChange}>
                <option value={ProductSortingAlgorithm.Relevance}>Sort By Revelance</option>
                <option value={ProductSortingAlgorithm.PriceAscending}>Sort By Price - Ascending</option>
                <option value={ProductSortingAlgorithm.PriceDescending}>Sort By Price - Descending</option>
            </select>
            <label>Items Per Page
            <select value={itemsPerPage} onChange={handleItemsChange}>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={36}>36</option>
                <option value={48}>48</option>
                <option value={60}>60</option>
            </select>
            </label>
        </div>
    </div>
    <div className={styles.mainSection}>
        <div className={styles.filtersContainer}>
            <ModelFilter onModelSelect={handleModelSelection} modelDetails={filtersData.modelDetails} />
            <StyleFilter styles={filtersData.styles} onStyleSelect={handleStyleSelection} />
            <ColorFilter colors={filtersData.colors} onColorSelect={setSelectedColor} />
            <SizeFilter sizes={filtersData.productSizes} onSizeSelect={setSelectedSizes} selectedSizes={selectedSizes}/>
            <PriceFilter minimumPrice={filtersData.minPrice} maximumPrice={filtersData.maxPrice} />
        </div>
        <div className={styles.productsContainer}>
            <div>
                <Pagination onClick={() => props.onClick(props.products[0])} products={products} itemsPerPage={itemsPerPage} currentPage={currentPage}/>
            </div>
            <div className={styles.paginationControlContainer}>
                <button className={styles.paginationMainButton} onClick={() => {
                    const newPageIndex = Math.min(currentPage + 1,Math.floor(products.length / itemsPerPage) );
                    setCurrentPage(newPageIndex);
                }}>
                <img className={styles.btnImage} src="/images/product/left-arrow.png"/>
                </button>
                {props.products.map((item,index) => (
                    (index % itemsPerPage === 0) && <button key={'aasd'+index} 
                    className={styles.paginationButton} onClick={() => setCurrentPage(index + 1)}>{(index / itemsPerPage) + 1}</button>
                )) }
                <button className={styles.paginationMainButton} onClick={() => {
                    const newPageIndex = Math.max(currentPage - 1,1 );
                    setCurrentPage(newPageIndex);
                }}>
                <img className={styles.btnImage} src="/images/product/right-arrow.png"/>
                </button>
            </div>
        </div>
    </div>
    </div>);
}

export default ProductsBrowser;