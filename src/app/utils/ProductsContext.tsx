import { createContext, useEffect, useState } from 'react';


export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    images: string[],
    discount?: number,// In percentage
    inventoryCount?: number,
    brandName?: string,
    category?: string,
    rating?: number,
    reviews?: ConsumerReview[]
}

export interface ConsumerReview {
    userName: string,
    rating: number,
    comment: string
}


type ProductContextType = {
    products : Product[];
}

// Create a default object based on the interface
const defaultProduct: Product = {
    id: 1,
    name: '',
    description: '',
    price: 0,
    images: [''],
    discount: 0,
    inventoryCount: 0,
    brandName: '',
    category: '',
    rating: 0,
    reviews: [{
        userName: '',
        rating: 0,
        comment: '',
    },{
        userName: '',
        rating: 0,
        comment: '',
    }]
  };
  

export const ProductsContext = createContext<ProductContextType>({products : []});

const ProductsManager = ({children}) => {
    const [allProducts,setProducts] = useState({products : [defaultProduct]});
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('/api/fetchProducts');
              const data : Product[] = await response.json();
              console.log('Data Fetched Successfully!');
              setProducts({products : data});
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          fetchData();
    },[])
      
    return (<ProductsContext.Provider value={allProducts}>
        {children}
    </ProductsContext.Provider>);
}

export default ProductsManager;
