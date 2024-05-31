export interface ProductReview {
    _id:            string;
    headingText:    string;
    reviewText:     string;
    reviewLikes:    number;
    reviewDislikes: number;
    reviewerName:   string;
    rating:         number;
    productId:      string;
}