import mongoose, { Schema, model } from 'mongoose';

const product = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    previousPrice: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    inventoryCount: {
        type: [Number],
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    sizes: {
        type: [String],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    productModel: {
        type: String,
        required: true
    }
});


export const Product = model('Product',product);
