import { createContext, useState } from "react"
import { Product } from "./ProductsContext"

type PromotionContextType = {
    products : Product[] 
}

export const PromotionsContext = createContext<PromotionContextType>({products : []});

const PromotionsManager = ({children}) => {
    const [promotionalProducts,setProducts] = useState<PromotionContextType>({products : []});
    return (<PromotionsContext.Provider value={promotionalProducts}>
        {children}
    </PromotionsContext.Provider>);
}

export default PromotionsManager;