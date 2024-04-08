import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchProducts } from '../utils/fetchProducts';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string[];
  discount: number;
  availability: boolean;
  brandName: string;
  category: string;
  rating: number;
  reviews: []
}

interface ProductContextType{
  products : Product[];
  setProducts : React.Dispatch<React.SetStateAction<Product[]>>;
}


const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => null
});

export const ProductsProvider = ({ children }) => {
    const[products,setProducts] = useState<Product[]>([]);
    setProducts(fetchProducts());
    return (
      <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
    );
}
