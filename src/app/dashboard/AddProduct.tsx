"use client";

import { ChangeEvent, useState } from "react";
import styles from "./AddProduct.module.css";
import { CldUploadWidget, CldUploadWidgetProps } from 'next-cloudinary';
import config from '../utils/cloudinary'; // Import from config file
import { Cloudinary } from '@cloudinary/url-gen';

function AddProduct() {
    
    const [images,setImages] = useState<string[]>([]);

    const onSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    
    const handleUpload = (newImage : string) => {
        const newImages = images;
        newImages.push(newImage);
        setImages(newImages);
    }

    return (<form className={styles.form} onSubmit={onSubmit}>
        <label>
            <input type='text' placeholder="Product Name"/>
        </label>
        <label>
            <input type='text' placeholder="Product Section"/>
        </label>
        <label>
            <input type='text' placeholder="Product Category"/>
        </label>
        <label>
            <input type='text' placeholder="Brand Name"/>
        </label>
        <label>
            <input type='number' placeholder="price"/>
        </label>
        <label>
            Images
        </label>
        <div>
            {images?.map((image) => <img src={image}/>)}
        </div>
        <div>
        <CldUploadWidget uploadPreset=""> 
            {({ open }) => {
                return (
                <button onClick={() => open()}>
                    Upload an Image
                </button>
                );
            }}
        </CldUploadWidget>
        </div>
        <button type='submit'>Add Product</button>
    </form>);
}

export default AddProduct;