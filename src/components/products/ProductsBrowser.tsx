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
import { useRouter } from "next/router";
import { useExtractQueryParams } from "../lib/hooks/useExtractRouterQuery";
import { FiltersData } from "./FiltersData";
import { getFiltersData } from "../utils/getFiltersData";
import { getCookie, setCookie } from "cookies-next";
import { routerQueryForProductPagination } from "../lib/constants";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface Props {
    products : Product[],
    productSection: string,
    productCategory: string
}

enum ProductSortingAlgorithm {
    Relevance,
    PriceAscending,
    PriceDescending
}

function ProductsBrowser(props : Props)
{
    const router = useRouter();
    const paginationParams = useExtractQueryParams(getCookie(routerQueryForProductPagination) !== undefined ? getCookie(routerQueryForProductPagination) as string : router.asPath);

    const [itemsPerPage,setItemPerPage] = useState(12);
    const [currentPage,setCurrentPage] = useState(1);
    const [sortingAlgorithm,setSortingAlgorithm] = useState(ProductSortingAlgorithm.Relevance);
    const [products,setProducts] = useState(props.products);
    const [selectedModels,setSelectedModels] = useState(['']);
    const [selectedStyles,setSelectedStyles] = useState(['']);
    const [selectedColors,setSelectedColors] = useState<string[]>(['']);
    const [selectedSizes,setSelectedSizes] = useState(['']);
    const [priceRange,setPriceRange] = useState<number[]>([]);
    const [filtersOpen,setFilterStatus] = useState(false);

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
        setSelectedModels(models);
        setSelectedColors(['']);
        setSelectedStyles(['']);
        setSelectedSizes(['']);
        if (models.length > 1 ) {
            const filteredProducts = props.products.filter((product) => models.includes(product.productModel));
            setProducts(filteredProducts);
            console.log(filteredProducts);
        }
        else {
            setProducts(props.products);
        }
        handlePageChange(1);
    }

    const handleStyleSelection = (styles : string[]) => {
        setSelectedModels(['']);
        setSelectedColors(['']);
        setSelectedStyles(styles);
        setSelectedSizes(['']);
        if (styles.length > 1) {    
            const filteredProducts = props.products.filter((product) => styles.includes(product.style));
            setProducts(filteredProducts);
        }
        else {
            setProducts(props.products);   
        }
        handlePageChange(1);
    }

    const handleColorSelection = (colors : string[]) => {
        setSelectedModels(['']);
        setSelectedStyles(['']);
        setSelectedColors(colors);
        if (colors.length > 1) {
            const filteredProducts = products.filter((product) => colors.includes(product.color));
            setProducts(filteredProducts);   
        }
        else {
            setProducts(props.products);   
        }
        handlePageChange(1);
    }

    const handleSizeSelection = (sizes : string[]) => {
        setSelectedSizes(sizes);
        if (sizes.length > 1) {
            const filteredProducts = products.filter(function checkSize(product){
                product.sizes.forEach((size,index) => sizes.includes(size) && product.inventoryCount[index] > 0)
            });
            setProducts(filteredProducts);
        }
        handlePageChange(1);
    }

    const handlePriceSelection = (newPriceRange : number[]) =>{
        const allProducts = props.products.filter(function filterProduct(product) {

            if (selectedModels.length > 1 && selectedModels.includes(product.productModel)) {
                return false;
            }

            if (selectedStyles.length > 1 && selectedStyles.includes(product.style)) {
                return  false;
            }

            if (selectedColors.length > 1 && selectedColors.includes(product.color)) {
                return false;
            }

            if (product.price >= newPriceRange[0] && product.price <= newPriceRange[1]) {
                return true;
            }
        })
        setPriceRange(newPriceRange);
        setProducts(allProducts);
        handlePageChange(1);
    }

    useEffect(() => {
        const setData = () => {
            if (paginationParams !== undefined && typeof(paginationParams.page) === 'number') {
                const value = paginationParams.sortingMode as number;
                setItemPerPage(paginationParams.itemsOnPage as number);
                setCurrentPage(paginationParams.page);  
            }
        }

        setTimeout(setData,800);

    },[]);

    const handlePageChange = (pageNumber : number) => {
        setCurrentPage(pageNumber);
        const urlQuery : string = `${router.basePath}/${props.productSection}/${props.productCategory}?page=${pageNumber}&itemsOnPage=${itemsPerPage}&sortingMode=${sortingAlgorithm}`;
        setCookie(routerQueryForProductPagination, urlQuery);
        router.replace(urlQuery);
    }

    const setNewPage = () => {
        const newPageIndex = Math.min(currentPage + 1,Math.floor(products.length / itemsPerPage) );
        handlePageChange(newPageIndex);
    }

    const setPreviousPage = () => {
        const newPageIndex = Math.max(currentPage - 1,1);
        handlePageChange(newPageIndex);
    }

    useEffect(() => {
        setProducts(props.products);
        const filtersData : FiltersData = getFiltersData(props.products);
        setFiltersData(filtersData);
    }, [props.products.length]);

    const handleItemsChange = (event : ChangeEvent<HTMLSelectElement>) => {
        setItemPerPage(parseInt(event.target.value));
        handlePageChange(1);
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

        handlePageChange(1);
    }

    return (<div className={styles.container}>
        {(props.products === undefined || props.products.length === 0 || props.products === null) && <div className={styles.progressContainer}>
        <Box sx={{ margin: 'auto', display: 'flex', height: '100px', width : '100px' }}>
            <CircularProgress />
        </Box>
        </div>}
        <div className={styles.controllerContainer}>
        <div className={styles.filtersButton} onClick={() => setFilterStatus(!filtersOpen)}>
            <img src="/images/product/filter.svg"/>
        </div>
        <div className={styles.pageControls}>
            <label className={styles.sortItemSelectContainer}>Sort By 
            <select className={`${styles.sortingLogicSelect} ${styles.sortSelectOption}`} value={sortingAlgorithm} onChange={handleSortAlgorithmChange}>
                <option className={styles.sortSelectOption} value={ProductSortingAlgorithm.Relevance}>Relevance</option>
                <option className={styles.sortSelectOption} value={ProductSortingAlgorithm.PriceAscending}>Ascending</option>
                <option className={styles.sortSelectOption} value={ProductSortingAlgorithm.PriceDescending}>Descending</option>
            </select>
            </label>
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
        <div className={`${styles.filtersContainer} ${filtersOpen && styles.filtersOpen}`}>
            <div className={styles.filterContainerHeader}>
            <p className={styles.filterHeaderText}>Filters</p>
            {!filtersOpen && <img src="/images/product/filter.svg"/>}
            </div>
            <ModelFilter onModelSelect={handleModelSelection} modelDetails={filtersData.modelDetails} selectedModels={selectedModels}/>
            <StyleFilter styles={filtersData.styles} onStyleSelect={handleStyleSelection} selectedStyles={selectedStyles}/>
            <ColorFilter colors={filtersData.colors} onColorSelect={handleColorSelection} selectedColors={selectedColors}/>
            <SizeFilter sizes={filtersData.productSizes} onSizeSelect={handleSizeSelection} selectedSizes={selectedSizes}/>
            <PriceFilter minimumPrice={filtersData.minPrice} maximumPrice={filtersData.maxPrice} onPriceChange={handlePriceSelection} />
        </div>
        <div className={styles.productsContainer}>
            <div>
                <Pagination products={products} itemsPerPage={itemsPerPage} currentPage={currentPage}/>
            </div>
            {products.length > 0 && <div className={styles.paginationControlContainer}>
                <a className={styles.paginationMainButton} onClick={setPreviousPage} href="#">
                <span className={styles.paginationButtonInvertedArrow}>&#10132;</span>Previous
                </a>
                <div className={styles.buttonsContainer}>
                {products.map((item,index) => (
                    ((index % itemsPerPage === 0 && index < props.products.length - itemsPerPage && (index / itemsPerPage) < 3 + currentPage && (index / itemsPerPage) > currentPage - 3) && <a key={'aasd'+index} href="#"
                    className={`${styles.paginationButton} ${currentPage == ((index / itemsPerPage) + 1) && styles.paginationButtonActive}`} onClick={() => {
                        handlePageChange((index / itemsPerPage) + 1);
                    }}>{(index / itemsPerPage) + 1}</a>
                )))}
                </div>
                <a className={styles.paginationMainButton} href="#" onClick={setNewPage}>Next &#10140;
                </a>
            </div>}
        </div>
    </div>
    </div>);
}

export default ProductsBrowser;