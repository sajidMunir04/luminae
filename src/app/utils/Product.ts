export type Product = {
    _id:            string;
    name:           string;
    description:    string;
    price:          number;
    previousPrice:  number;
    images:         string[];
    discount:       number;
    inventoryCount: number[];
    brandName:      string;
    category:       string;
    section:        string;
    sizes:          string[],
    color:          string,
    style:          string,
    model:          string,    
    reviews?:       ProductReview[],
}

export interface ProductInventoryCategory{
    size: string,
    stock: number 
}

interface ProductReview {
    headingText: string,
    reviewText: string,
    reviewLikes: number,
    reviewDislikes: number,
    reviewerName: string,
    rating: number
} 