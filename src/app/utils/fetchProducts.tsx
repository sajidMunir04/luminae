import {Product} from '../shared/ProductsContext';


export async function fetchProducts()
{
    const response = await fetch('https://fake-store-api.mock.beeceptor.com/api/products');
    const products =((response) => response.json().then((result) => {
        result : Product
        }).catch((err) => {
        
    }))
    return products;
}