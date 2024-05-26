import { ChangeEvent, useEffect, useState } from "react";
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
    products : Product[]
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
    const[selectedModels,setSelectedModels] = useState(['']);
    const[selectedStyles,setSelectedStyles] = useState(['']);
    const[selectedColors,setSelectedColors] = useState<string[]>(['']);
    const[selectedSizes,setSelectedSizes] = useState(['']);
    const[priceRange,setPriceRange] = useState<number[]>([]);
    const defaultFilterData : FiltersData = {
        minPrice: 0,
        maxPrice: 0,
        colors: [],
        productSizes: [],
        modelDetails: [],
        styles: []
    }
    const[filtersData,setFiltersData] = useState<FiltersData>(defaultFilterData);

    const handleModelSelection = (models : string[]) => {
        setProducts(props.products);
        setSelectedModels(models);
        setSelectedColors(['']);
        setSelectedStyles(['']);
        setSelectedSizes(['']);
        const filteredProducts = props.products.filter((product) => models.includes(product.model));
        setProducts(filteredProducts);
    }

    const handleStyleSelection = (styles : string[]) => {
        setProducts(props.products);
        setSelectedModels(['']);
        setSelectedColors(['']);
        setSelectedStyles(styles);
        setSelectedSizes(['']);
        const filteredProducts = props.products.filter((product) => styles.includes(product.style));
        setProducts(filteredProducts);
    }

    const handleColorSelection = (colors : string[]) => {
        setSelectedColors(colors);
        const filteredProducts = products.filter((product) => selectedColors.includes(product.color));
        setProducts(filteredProducts);
    }

    const handleSizeSelection = (sizes : string[]) => {
        setSelectedSizes(sizes);
        const filteredProducts = products.filter(function checkSize(product){
            product.sizes.forEach((size,index) => sizes.includes(size) && product.inventoryCount[index] > 0)
        });
        setProducts(filteredProducts);
    }

    const handlePriceSelection = (newPriceRange : number[]) =>{
        setPriceRange(newPriceRange);
        const filteredProducts = products.filter((product) => product.price >= newPriceRange[0] && product.price <= newPriceRange[1]);
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
        console.log(props.products.length,products.length);
    }, [props.products.length]);

    const handleItemsChange = (event : ChangeEvent<HTMLSelectElement>) => {
        setItemPerPage(parseInt(event.target.value));
    }

    const handleSortAlgorithmChange = (event : ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        const enumValues = Object.values(ProductSortingAlgorithm);
        const enumValue = enumValues[value] as number;
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

    return (<div className={styles.container}>
        <div className={styles.controllerContainer}>
        <div>

        </div>
        <div className={styles.pageControls}>
            <select className={styles.sortingLogicSelect} value={sortingAlgorithm} onChange={handleSortAlgorithmChange}>
                <option value={ProductSortingAlgorithm.Relevance}>Sort By Revelance</option>
                <option value={ProductSortingAlgorithm.PriceAscending}>Sort By Price - Ascending</option>
                <option value={ProductSortingAlgorithm.PriceDescending}>Sort By Price - Descending</option>
            </select>
            <label className={styles.pageItemSelectContainer}>Items Per Page
            <select className={styles.pageItemSelect} value={itemsPerPage} onChange={handleItemsChange}>
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
            <ModelFilter onModelSelect={handleModelSelection} modelDetails={filtersData.modelDetails} selectedModels={selectedModels}/>
            <StyleFilter styles={filtersData.styles} onStyleSelect={handleStyleSelection} selectedStyles={selectedStyles}/>
            <ColorFilter colors={filtersData.colors} onColorSelect={handleColorSelection} selectedColors={selectedColors}/>
            <SizeFilter sizes={filtersData.productSizes} onSizeSelect={handleSizeSelection} selectedSizes={selectedSizes}/>
            <PriceFilter minimumPrice={filtersData.minPrice} maximumPrice={filtersData.maxPrice} />
        </div>
        <div className={styles.productsContainer}>
            <div>
                <Pagination products={products} itemsPerPage={itemsPerPage} currentPage={currentPage}/>
            </div>
            {products.length > 0 && <div className={styles.paginationControlContainer}>
                <a className={styles.paginationMainButton} onClick={() => {
                    const newPageIndex = Math.min(currentPage + 1,Math.floor(products.length / itemsPerPage) );
                    setCurrentPage(newPageIndex);
                }} href="#">
                <img className={styles.btnImage} src="/images/product/left-arrow.png"/>Previous
                </a>
                {products.map((item,index) => (
                    (index % itemsPerPage === 0 && (index / itemsPerPage) < currentPage + 2) && <a key={'aasd'+index} href="#"
                    className={styles.paginationButton} onClick={() => setCurrentPage(index)}>{(index / itemsPerPage) + 1}</a>
                ))}
                {
                    (products.length / itemsPerPage > currentPage + 2) && <p className={styles.extraButtonsArea}>...</p> 
                }
                <a className={styles.paginationMainButton} href="#" onClick={() => {
                    const newPageIndex = Math.max(currentPage - 1,1 );
                    setCurrentPage(newPageIndex);
                }}>Next
                <img className={styles.btnImage} src="/images/product/right-arrow.png"/>
                </a>
            </div>}
        </div>
    </div>
    </div>);
}

export default ProductsBrowser;