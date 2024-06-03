import { useState, useEffect } from "react";
import { ProductClassifcation, ProductSection } from "../shared/ProductCategoriesManager";
import ProductBrowser from "./ProductBrowser";
import styles from "./ProductManager.module.css";
import InventoryUpdater from "./InventoryUpdater";
import { Product } from "../utils/Product";
import PriceUpdater from "./PriceUpdater";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function ProductsManager() {
    const [isProductBeingUpdated,setProductUpdateStatus] = useState(false);
    const [isCategorySelected,setCategorySelectStatus] = useState(true);
    const [selectedSection, setSelectedSection] = useState<string[]>([]);
    const [isUpdatingInventory,setInventoryUpdateStatus] = useState(false);
    const [isUpdatingPrice, setPriceUpdateStatus] = useState(false);
    const [selectedProduct,setSelectedProduct] = useState<Product | undefined>();

    let allProductSections : ProductSection[] = [];
    const empty : ProductSection[] = [{
        productSection: '',
        subCategories: []
    }]
    const [productSections,setProducts] = useState(empty);
    useEffect(
        () => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/fetchProductsClassifcation');
                const data = await response.json();
                const products: ProductClassifcation[] = data.map((item: ProductClassifcation) => ({
                    category: item.category,
                    section: item.section
                }));

              products.map((item) => {
                        let containsSection = false;
                        allProductSections.forEach((prodSec,index) => {
                            if (prodSec.productSection == item.section)
                                {
                                    containsSection = true;

                                    if (!prodSec.subCategories.includes(item.category))
                                        prodSec.subCategories.push(item.category as string)    
                                }
                        })
                        if (!containsSection)
                        {
                                let newProductSection : ProductSection = {
                                    productSection : item.section as string,
                                    subCategories: [item.category as string]
                                }
                                allProductSections.push(newProductSection);
                        }
              })
              setProducts(allProductSections);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          fetchData();
          
    },[])

    const openProductBrowser = (section: string,category : string) => {
        const prodSection : string[] = [];
        prodSection.push(section);
        prodSection.push(category);
        setSelectedSection(prodSection);
        setCategorySelectStatus(true);
    }

    const openInventoryManagement = (product: Product) => {
        setInventoryUpdateStatus(true);
        setSelectedProduct(product);
    }

    const openPriceUpdateSection = (product : Product) => {
        setSelectedProduct(product);
        setPriceUpdateStatus(true);
    }

    const closePriceUpdateSection = () => {
        setPriceUpdateStatus(false);
        setSelectedProduct(undefined);
    }

    const closeInventoryManagement = () => {
        setInventoryUpdateStatus(false);
        setSelectedProduct(undefined);
    }

    return (<div className={styles.container}>
            <div className={styles.navSection}>
                {productSections.map((productSection) => <div key={productSection.productSection+ ' asdasd'}>
                <h3>{productSection.productSection}</h3>
                <div className={styles.categoriesContainer}>
                {productSection.subCategories.map((category) => (<button key={productSection.productSection + category + '1231'} onClick={() => {openProductBrowser(productSection.productSection,category)}}>{category}</button>))}
                   
                </div>
            </div>)}
            </div>
            <div className={styles.dataSection}>
                {isProductBeingUpdated && <div className={styles.progressContainer}>
            <p className={styles.progressText}>Adding Product to Database</p>
                <Box sx={{ margin: 'auto', display: 'flex', height: '100px', width : '100px' }}>
                    <CircularProgress color='secondary'/>
                </Box>
        </div>}
            {isCategorySelected && <ProductBrowser products={selectedSection[0]}
            productCategory={selectedSection[1]} openInventory={openInventoryManagement} openPriceUpdate={openPriceUpdateSection}/>}
            </div> 
            {(isUpdatingInventory && selectedProduct !== undefined) && <InventoryUpdater product={selectedProduct!} onCloseButton={closeInventoryManagement}/>}      
            {(isUpdatingPrice && selectedProduct !== undefined) && <PriceUpdater product={selectedProduct} onCloseButton={closePriceUpdateSection}/>}
    </div>);
}

export default ProductsManager;