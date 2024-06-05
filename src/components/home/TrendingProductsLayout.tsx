"use client";

import ProductDisplayLayoutHeader from "./ProductDisplayLayoutHeader";
import TrendingProductDisplayCard from '../products/TrendingProductDisplayCard';
import styles from './TrendingProductsLayout.module.css';
import { useEffect, useState } from "react";
import { Product } from "../utils/Product";

function TrendingProductsLayout()
{
    const [products,setProducts] = useState<Product[]>([]);

    useEffect(
        () => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/getTrendingProducts');
                const data = await response.json();
                const products = data.map((item: Product) => ({
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
                    productModel: item.productModel
                }));

              setProducts(products);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          setTimeout(fetchData,250);       
    },[])

    return (<div className={styles.container}>
        <ProductDisplayLayoutHeader heading="Trending Products" link="/WOMAN/jackets" linkText="View All"/>
        <div className={styles.content}>
            {products.map((product) => <TrendingProductDisplayCard key={product._id} product={product} />)}
        </div>
    </div>);
}

export default TrendingProductsLayout;