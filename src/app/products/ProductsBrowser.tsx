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
import { useStoreRouterQuery } from "../lib/hooks/useStoreRouterQuery";
import { useGetRouterQuery } from "../lib/hooks/useGetRouterQuery";

interface Props {
    products : Product[],
    productSection: string,
    productCategory: string
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
    const router = useRouter();
    const paginationParams = useExtractQueryParams(useGetRouterQuery() !== undefined ? useGetRouterQuery() as string : router.asPath);

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

        console.log(paginationParams);

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
        useStoreRouterQuery(urlQuery);
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
        <div className={styles.controllerContainer}>
        <div>

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
                <a className={styles.paginationMainButton} onClick={setPreviousPage} href="#">
                <span className={styles.paginationButtonInvertedArrow}>&#10132;</span>Previous
                </a>
                <div className={styles.buttonsContainer}>
                {products.map((item,index) => (
                    ((index % itemsPerPage === 0 && index < props.products.length - itemsPerPage) && <a key={'aasd'+index} href="#"
                    className={styles.paginationButton} onClick={() => {
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