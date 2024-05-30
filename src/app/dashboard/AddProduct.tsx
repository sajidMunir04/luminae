"use client";

import { ChangeEvent, useState } from "react";
import styles from "./AddProduct.module.css";
import { CldUploadWidget, CldUploadWidgetProps , CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import config from '../utils/cloudinary'; // Import from config file
import { Cloudinary } from '@cloudinary/url-gen';
import cloudinary from "../utils/cloudinary";

function AddProduct() {
    
    const [images,setImages] = useState<string[]>([]);

    const onSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    console.log(images);
    
    return (<form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>Product Name
            <input className={styles.inputField} type='text' placeholder="Product Name"/>
        </label>
        <label className={styles.label}>Product Section
            <input className={styles.inputField} type='text' placeholder="Product Section"/>
        </label>
        <label className={styles.label}>Product Category
            <input className={styles.inputField} type='text' placeholder="Product Category"/>
        </label>
        <label className={styles.label}>Product's Brand Name
            <input className={styles.inputField} type='text' placeholder="Brand Name"/>
        </label>
        <label className={styles.label}>$
            <input className={styles.inputField} type='number' placeholder="price"/>
        </label>
        <label className={styles.label}>
            Images
        </label>
        <div className={styles.productImagesContainer}>
            {images?.map((image) => <img className={styles.productImage} src={image}/>)}
        </div>
        <div>
        <CldUploadWidget uploadPreset={'unsigned_uploads'}
          onSuccess={(results, { widget }) => {
            const info = results?.info as CloudinaryUploadWidgetInfo;
            if (info) {
                const newImages = images;
                images.push(info.url);
                setImages(newImages);
            } 
            widget.close();
          }}> 
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