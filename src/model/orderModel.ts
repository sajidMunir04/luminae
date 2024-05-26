import mongoose, { Schema, model } from 'mongoose';

const order = new Schema({
    products : [{ 
        type: {
        id: String,
        name: String,
        quantity: Number,
        unitPrice: Number
    },
    required: true
}],
    customeremail: {type: String,required: true},
    customerName: {type: String,required: true},
    customerPhone: {type: String,required: true},
    customerAddress: {type: String,required: true},
    customerRegion: {type: String,required: true},
    customerCountry: {type: String,required: true},
    orderPriceTotal: {type: Number,required: true},
    orderShippingCharges: {type: Number,required: true},
    orderTaxes: {type: Number,required: true},
});


export const Order = model('Order',order);
