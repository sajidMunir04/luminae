import { ModelDetail } from "./filters/ModelFilter";

export interface FiltersData {
    minPrice: number,
    maxPrice: number,
    colors: string[],
    productSizes: string[],
    modelDetails: ModelDetail[],
    styles: string[]
}