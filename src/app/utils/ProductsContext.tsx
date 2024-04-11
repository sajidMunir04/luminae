import { createContext, useEffect, useState } from 'react';


export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    images: string[],
    discount: number,// In percentage
    inventoryCount: number,
    brandName: string,
    category: string,
    rating: number,
    reviews: ConsumerReview[]
}

export interface ConsumerReview {
    userName: string,
    rating: number,
    comment: string
}


type ProductContextType = {
    products : Product[];
}

export const ProductsContext = createContext<ProductContextType>({products: []});

const ProductsManager = ({children}) => {
    const [allProducts,setProducts] = useState<ProductContextType>({products : []});
    useEffect(() => {
        async function fetchData(){
            await fetch('https://fakestoreapi.com/products').
            then(response => console.log(response.json)).catch(() => console.log("Failed"));
        }

        fetchData();
    });
    return (<ProductsContext.Provider value={allProducts}>
        {children}
    </ProductsContext.Provider>);
}

export default ProductsManager;
