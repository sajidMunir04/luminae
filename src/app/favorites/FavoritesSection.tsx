import { useEffect, useState } from "react";
import { useCartStore } from "../lib/store/useCartStore";
import { Product } from "../utils/Product";
import styles from "./FavoritesSection.module.css";
import ProductDisplayCard from "../products/ProductDisplayCard";
import { useFavoritesStore } from "../lib/store/useFavoritesStore";
import Pagination from "../products/Pagination";
import ProductPage from "../products/ProductPage";

function FavoritesSection() {
    const favoritesProductData = useFavoritesStore(state => state.fetchData());
    const [products,setProducts] = useState<Product[]>();
    const [isProductSelected,setProductSelectStatus] = useState(false);
    const [selectedProduct,setSelectedProduct] = useState<Product>();

    const removeProductFromFavorites = (product : Product) => {
        const filteredProducts = products?.filter((item) => item._id !== product._id);
        setProducts(filteredProducts);
    }

    const selectProduct = (product: Product) => {
        setProductSelectStatus(true);
        setSelectedProduct(product);
    }

    let productsId : string[] = [];

    useEffect(() => {
        const productsId : string[] = [];
        favoritesProductData.map((item) => productsId.push(item));
        const fetchData =  async() => {
            try {
                const response = await fetch('api/fetchSpecificProducts/' + productsId);
                const data = await response.json();
                const products : Product[] = data.map((item: Product) => ({
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
                    reviews: item.reviews
                }));

                setProducts(products);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();

    },products)

    return (<div className={styles.container}>
            <div className={styles.filtersContainer}>

            </div>
            <div className={styles.contentContainer}>
                {!isProductSelected && products?.map((item) => <ProductDisplayCard product={item} onClick={() => selectProduct(item)} onRemoveFromFavorites={() => removeProductFromFavorites(item)}/>)}
                {isProductSelected && <ProductPage product={selectedProduct as Product} />}
            </div>
    </div>);
}

export default FavoritesSection;