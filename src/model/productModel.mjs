import mongoose, { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    images: [String],
    discount: Number,
    inventoryCount: Number,
    brandName: String,
    category: String,
    section: String,
    rating: Number,
    sizes: [String],
    color: String,
    style: String,
    model: String,    
    reviews: [{headingText: String,
        reviewText: String,
        reviewLikes: Number,
        reviewDislikes: Number,
        reviewerName: String,
        rating: Number
    }]
});


export const Product = model('Product',productSchema);
