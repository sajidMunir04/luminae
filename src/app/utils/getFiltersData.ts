import { FiltersData } from "../products/FiltersData";
import { ModelDetail } from "../products/filters/ModelFilter";
import { Product } from "./Product";


export function getFiltersData(products : Product[]) {
    const newFiltersData : FiltersData = {
        minPrice: 0,
        maxPrice: 0,
        colors: [],
        productSizes: [],
        modelDetails: [],
        styles: []
    }
    products.forEach((item) => {
        if (item.price < newFiltersData.minPrice)
            newFiltersData.minPrice = item.price;

        if (item.price > newFiltersData.maxPrice)
            newFiltersData.maxPrice = item.price;

        if (!newFiltersData.colors.includes(item.color))
            newFiltersData.colors.push(item.color);

        item.sizes.map(function tagChecker(tag){
            if (!newFiltersData.productSizes.includes(tag)){
                newFiltersData.productSizes.push(tag);
            }
        })

        {
            let modelAdded = false;

            newFiltersData.modelDetails.forEach((model,index) => {
                if (model.type == item.model)
                {
                    model.quantity++;
                    modelAdded = true;
                }
            })
    
            if (!modelAdded) {
                const modelDetail : ModelDetail = {
                    type: item.model,
                    quantity: 1
                }
                newFiltersData.modelDetails.push(modelDetail);
            }
        }

        if (!newFiltersData.styles.includes(item.style))
            newFiltersData.styles.push(item.style);
    })    


    return newFiltersData;
}