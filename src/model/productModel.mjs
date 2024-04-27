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
    reviews: [{ userName: String,
                rating: String,
                comment: String}]
});


export const Product = model('Product',productSchema);
