import { Schema, model } from 'mongoose';


const productReview = new Schema({
    headingText: { type : String, required : true},
    reviewText: { type : String, required : true},
    reviewLikes: { type : Number, required : true},
    reviewDislikes: { type : Number, required : true},
    reviewerName: { type : String, required : true},
    rating: { type : Number, required : true},
    productId: {type : String, required: true}
});


export const ProductReview = model('ProductReview',productReview);