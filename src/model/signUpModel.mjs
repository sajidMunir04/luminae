import mongoose, { Schema, model } from 'mongoose';

const signUpSchema = new Schema({
    name: String,
    email: String,
    password: String
});


export const SignUp = model('SignUp',signUpSchema);
