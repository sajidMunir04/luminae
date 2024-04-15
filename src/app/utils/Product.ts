import { CustomerReview } from "./CustomerReview"

export type Product = {
    _id:            string;
    name:           string;
    description:    string;
    price:          number;
    images:         string[];
    discount?:       number;
    inventoryCount?: number;
    brandName:      string;
    category:       string;
    section:        string;
    reviews?:        string[];
}