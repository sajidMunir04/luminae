import { createContext } from "react";
import { Product } from "./ProductsContext";


interface FavoriteContextType {
    products : Product[]
}

export const FavoritesContext = createContext<FavoriteContextType>({products : []});

const FavoritesManager = ({children}) => {
    return (<FavoritesContext.Provider value={{products : []}}>
    </FavoritesContext.Provider>);
}

export default FavoritesManager;