"use client";

import { useEffect, useState } from "react";
import { Product } from "../utils/Product";
import styles from "./FavoritesSection.module.css";
import ProductDisplayCard from "../products/ProductDisplayCard";
import { useFavoritesStore } from "../lib/store/useFavoritesStore";
import Pagination from "../products/Pagination";
import ProductPage from "../products/ProductPage";
import { useRouter } from "next/navigation";

function FavoritesSection() {
    const favoritesProductData = useFavoritesStore(state => state.fetchData());
    const removeFromFavorites = useFavoritesStore(state => state.removeFromFavorites);
    const [products,setProducts] = useState<Product[]>();

    const router = useRouter();

    const removeProductFromFavorites = (product : Product) => {
        removeFromFavorites(product);
        const filteredProducts = products?.filter((item) => item._id !== product._id);
        setProducts(filteredProducts);
    }

    const handleClick = (product : Product) => {
        const productId = product._id;
          router.replace('http://localhost:3000' + '/item/' + productId);
    }

    useEffect(() => {
        const productsId : string[] = [];
        favoritesProductData.map((item) => productsId.push(item));
        const fetchData =  async() => {
            try {
                const response = await fetch('api/fetchCartProducts/' + productsId);
                const data = await response.json();
                const products : Product[] = data.map((item: Product) => {
                const product: Product = {
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    images: item.images,
                    discount: item.discount,
                    inventoryCount: item.inventoryCount,
                    brandName: item.brandName,
                    category: item.category,
                    section: item.section,
                    sizes: item.sizes,
                    color: item.color,
                    style: item.style,
                    model: item.model,
                    reviews: item.reviews,
                    previousPrice: item.previousPrice
                }

                return product;
            });

                setProducts(products);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();

    },[products?.length])

    return (<div className={styles.container}>
            <div className={styles.contentContainer}>
                {products?.map((item) => <ProductDisplayCard product={item} onClick={() => handleClick(item)} 
                onRemoveFromFavorites={() => removeProductFromFavorites(item)}/>)}
            </div>
    </div>);
}

export default FavoritesSection;