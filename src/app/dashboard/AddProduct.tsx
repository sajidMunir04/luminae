"use client";

import { ChangeEvent, useState } from "react";
import styles from "./AddProduct.module.css";
import {Cloudinary} from "@cloudinary/url-gen";
import { CldUploadWidget } from 'next-cloudinary';

function AddProduct() {
    
    const [images,setImages] = useState<string[]>();
    const cld = new Cloudinary({cloud: {cloudName: 'df4tv1tjs'}});

    const onSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        <CldUploadWidget uploadPreset="<Your Upload Preset>">
  {({ open }) => {
    return (
      <button onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
        <button type='submit'>Add Product</button>
    </form>);
}

export default AddProduct;