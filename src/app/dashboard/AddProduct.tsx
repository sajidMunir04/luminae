"use client";

import { ChangeEvent, useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { Product } from "../utils/Product";

function AddProduct() {
    
    const [images,setImages] = useState<string[]>([]);
    const [imagesCount,setImagesCount] = useState(0);

    const [productName,setProductName] = useState('');
    const [productDescription,setProductDescription] = useState('');
    const [price,setPrice] = useState(0);
    const [discount,setDiscount] = useState(0.00);
    const [brandName,setBrandName] = useState('');
    const [category,setCategory] = useState('');
    const [section,setSection] = useState('');
    const [color,setColor] = useState('');
    const [style,setStyle] = useState('');
    const [productModel,setProductModel] = useState('');

    const onSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const product : Product = {
            _id: "",
            name: productName,
            description: productDescription,
            price: price,
            previousPrice: price + price * discount,
            images: images,
            discount: discount,
            inventoryCount: [50,50,50,50,50,50,50],
            brandName: brandName,
            category: category,
            section: section,
            sizes: ['XXS','XS','S','M','L','XL','XXL'],
            color: color,
            style: style,
            productModel: productModel
        }
    }  

    const handleName = (e : ChangeEvent<HTMLInputElement>) => {

    }

    const handleBrandName = (e : ChangeEvent<HTMLInputElement>) => {
        
    }

    const handleDescription = (e : ChangeEvent<HTMLInputElement>) => {
        
    }

    const handlePrice = (e : ChangeEvent<HTMLInputElement>) => {
        
    }

    const handleDiscount = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
        
    }

    const handleSection = (e: ChangeEvent<HTMLSelectElement>) => {
        
    }

    const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
        
    }

    const handleStyle = (e: ChangeEvent<HTMLInputElement>) => {
        
    }

    const handleProductModel = (e: ChangeEvent<HTMLInputElement>) => {
        
    }

    return (<>
    <h2 className={styles.headerText}>Add Product To Database</h2>
    <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>Name
            <input className={styles.inputField} type='text' onChange={handleName} placeholder="Product Name"/>
        </label>
        <label className={styles.label}>Section
            <select onChange={handleSection}>
            <option>MAN</option>
            <option>WOMAN</option>
            </select>
        </label>
        <label className={styles.label}>Category
            <input className={styles.inputField} onChange={handleCategory} type='text' placeholder="Product Category"/>
        </label>
        <label className={styles.label}>Brand Name
            <input className={styles.inputField} type='text' onChange={handleBrandName} placeholder="Brand Name"/>
        </label>
        <label className={styles.label}>Description
            <input className={styles.inputField} type='text' onChange={handleDescription} placeholder="Brand Name"/>
        </label>
        <label className={styles.label}>Price ($)
            <input className={styles.inputField} type='number' onChange={handlePrice} placeholder="0.99"/>
        </label>
        <label className={styles.label}>Discount (%)
            <input className={styles.inputField} type='number' onChange={handleDiscount} placeholder="25%"/>
        </label>
        <label className={styles.label}>Color
            <input className={styles.inputField} type='text' onChange={handleColor} placeholder="Product Color"/>
        </label>
        <label className={styles.label}>Style
            <input className={styles.inputField} type='text' onChange={handleStyle} placeholder="Product Style"/>
        </label>
        <label className={styles.label}>Product Model
            <input className={styles.inputField} type='text' onChange={handleProductModel} placeholder="Product Model"/>
        </label>
        <label className={styles.label}>
            Images
        </label>
        <div className={styles.productImagesContainer}>
            {imagesCount > 0 && images.map((item) => <img key={item} className={styles.productImage} src={item}/>)}
        </div>
        <div>
        <CldUploadWidget uploadPreset={'unsigned_uploads'}
          onSuccess={(results, { widget }) => {
            const info = results?.info as CloudinaryUploadWidgetInfo;
            if (info) {
                const newImages = images;
                images.push(info.url);
                setImages(newImages);
                setImagesCount(newImages.length);
            }
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
    </form>
    </>);
}

export default AddProduct;