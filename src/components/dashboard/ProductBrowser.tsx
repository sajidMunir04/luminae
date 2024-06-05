import { useState, useEffect } from "react";
import { ProductSection } from "../shared/ProductCategoriesManager";
import { Product } from "../utils/Product";
import ProductCard from "./ProductCard";
import axios from "axios";
import styles from "./ProductBrowser.module.css";

interface Props {
    products: string,
    productCategory: string,
    openInventory: (arg : Product | undefined) => void,
    openPriceUpdate: (arg: Product | undefined) => void,
    onStartUpdate : () => void,
    onFinishUpdate: () => void
}

function ProductBrowser(props : Props) {
    let filteredProducts : Product[] = [];
    const [allProducts,setProducts] = useState(filteredProducts);
    const [isInventoryUpdating,setInventoryUpdateStatus] = useState(true);

    const deleteProductFromDatabase = async(product : Product) => {
        const userResult = confirm(`Are you sure you want to delete ${product.name} `);
        if (!userResult) {
            return;
        }

        props.onStartUpdate();

        const filteredProducts = allProducts.filter((item) => item._id !== product._id);
        setProducts(filteredProducts);
        const response = await fetch('/api/removeProductFromDatabase',{
            method: "POST",
            body: product._id as string
        });
        const result = await response.json();
        const { status } = result;

        props.onFinishUpdate();

        if (status) {
            alert('Item Deleted From Database');
        }
    }

    useEffect(
        () => {
        const fetchData = async () => {
            try {
                const fetchQuery = `/api/fetchProducts/${props.products}/${props.productCategory}`;
                const response = await fetch(fetchQuery);
                const data = await response.json();
                filteredProducts = data.data.map((item: Product) => {
                  const product : Product = {
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    previousPrice: item.previousPrice,
                    images: item.images,
                    discount: item.discount,
                    inventoryCount: item.inventoryCount,
                    brandName: item.brandName,
                    category: item.category,
                    section: item.section,
                    sizes: item.sizes,
                    color: item.color,
                    style: item.style,
                    productModel: item.productModel
                }

                return product;            
            });
            setProducts(filteredProducts);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          setTimeout(fetchData,100);       
    },[props.productCategory])

    return (<div className={styles.container}>
        {isInventoryUpdating}
        {allProducts.map((product) => (
            <ProductCard key={product._id} product={product} onRemoveClick={deleteProductFromDatabase} onOpenInventory={props.openInventory} 
            onOpenPriceUpdate={props.openPriceUpdate}/>
        ))}
    </div>);
}

export default ProductBrowser;