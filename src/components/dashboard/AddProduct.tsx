"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./AddProduct.module.css";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { HexColorPicker } from "react-colorful";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export interface ProductToAdd {
    name:           string;
    description:    string;
    price:          number;
    previousPrice:  number;
    images:         string[];
    discount:       number;
    inventoryCount: number[];
    brandName:      string;
    category:       string;
    section:        string;
    sizes:          string[],
    color:          string,
    style:          string,
    productModel:   string
}


function AddProduct() {
    
    const [isProductAdded,setProductStatus] = useState(false);
    const [images,setImages] = useState<string[]>([]);
    const [imagesCount,setImagesCount] = useState(0);

    const [productName,setProductName] = useState('');
    const [productDescription,setProductDescription] = useState('');
    const [price,setPrice] = useState(0);
    const [discount,setDiscount] = useState(0.00);
    const [brandName,setBrandName] = useState('');
    const [category,setCategory] = useState('');
    const [section,setSection] = useState('');
    const [color,setColor] = useState('#aabbcc');
    const [style,setStyle] = useState('');
    const [productModel,setProductModel] = useState('');

    const xxsInventoryRef = useRef<HTMLInputElement>(null);
    const xsInventoryRef = useRef<HTMLInputElement>(null);
    const sInventoryRef = useRef<HTMLInputElement>(null);
    const mInventoryRef = useRef<HTMLInputElement>(null);
    const lInventoryRef = useRef<HTMLInputElement>(null);
    const xlInventoryRef = useRef<HTMLInputElement>(null);
    const xxlInventoryRef = useRef<HTMLInputElement>(null);

    const [isFormSubmitted,setFormStatus] = useState(false);

    const onSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isFormSubmitted)
            return;

        const product : ProductToAdd = {
            name: productName,
            description: productDescription,
            price: price,
            previousPrice: price + price * discount,
            images: images,
            discount: discount,
            inventoryCount: [parseInt(xxsInventoryRef.current?.value as string),parseInt(xsInventoryRef.current?.value as string),
                parseInt(sInventoryRef.current?.value as string),parseInt(mInventoryRef.current?.value as string),parseInt(lInventoryRef.current?.value as string)
                ,parseInt(xlInventoryRef.current?.value as string),parseInt(xxlInventoryRef.current?.value as string)],
            brandName: brandName,
            category: category.toLowerCase(),
            section: section,
            sizes: ['XXS','XS','S','M','L','XL','XXL'],
            color: color,
            style: style,
            productModel: productModel
        }

        setProductStatus(true);

        const uploadProductToDatabase = async() => {

            setFormStatus(true);

            const response = await fetch('/api/addProductToDatabase',{
                method: "POST",
                body: JSON.stringify(product)
            })
            const data = await response.json();

            if (data.data.acknowledged) {
                alert(`Product Added with id${data.data.insertedId}`);
                setProductStatus(false);
            }
        }

        uploadProductToDatabase();
    }  

    const handleName = (e : ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProductName(value);
    }

    const handleBrandName = (e : ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBrandName(value);
    }

    const handleDescription = (e : ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProductDescription(value);
    }

    const handlePrice = (e : ChangeEvent<HTMLInputElement>) => {
        const price = parseFloat(e.target.value);
        setPrice(price);
    }

    const handleDiscount = (e: ChangeEvent<HTMLInputElement>) => {
        const discount = parseFloat(e.target.value) * 0.01;
        setDiscount(discount);
    }

    const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
        const category = e.target.value;
        setCategory(category);        
    }

    const handleSection = (e: ChangeEvent<HTMLSelectElement>) => {
        const section = e.target.value;
        setSection(section);
    }

    const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value;
        setColor(color);
    }

    const handleStyle = (e: ChangeEvent<HTMLInputElement>) => {
        const style = e.target.value;
        setStyle(style);
    }

    const handleProductModel = (e: ChangeEvent<HTMLInputElement>) => {
        const productModel = e.target.value;
        setProductModel(productModel);
    }

    return (<>
    <h2 className={styles.headerText}>Add Product To Database</h2>
    <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>Name
            <input required={true} className={styles.inputField} type='text' onChange={handleName} placeholder="Product Name"/>
        </label>
        <label className={styles.label}>Section
            <select onChange={handleSection}>
            <option>MAN</option>
            <option>WOMAN</option>
            </select>
        </label>
        <label className={styles.label}>Category
            <input required={true} className={styles.inputField} onChange={handleCategory} type='text' placeholder="Product Category"/>
        </label>
        <label className={styles.label}>Brand Name
            <input required={true} className={styles.inputField} type='text' onChange={handleBrandName} placeholder="Brand Name"/>
        </label>
        <label className={styles.label}>Description
            <input required={true} className={styles.inputField} type='text' onChange={handleDescription} placeholder="Brand Name"/>
        </label>
        <label className={styles.label}>Price ($)
            <input required={true} className={styles.inputField} type='number' onChange={handlePrice} placeholder="0.99"/>
        </label>
        <label className={styles.label}>Discount (%)
            <input required={true} className={styles.inputField} type='number' onChange={handleDiscount} placeholder="25%"/>
        </label>
        <p>Inventory</p>
        <div className={styles.sizesInputContainer}>
            <label className={styles.sizeInputLabel}>XXS
                <input required={true} ref={xxsInventoryRef} className={styles.sizeInput} type='number'/>
            </label>
            <label className={styles.sizeInputLabel}>XS
                <input required={true} ref={xsInventoryRef} className={styles.sizeInput} type='number'/>
            </label>
            <label className={styles.sizeInputLabel}>S
                <input required={true} ref={sInventoryRef} className={styles.sizeInput} type='number'/>
            </label>
            <label className={styles.sizeInputLabel}>M
                <input required={true} ref={mInventoryRef} className={styles.sizeInput} type='number'/>
            </label>
            <label className={styles.sizeInputLabel}>L
                <input required={true} ref={lInventoryRef} className={styles.sizeInput} type='number'/>
            </label>
            <label className={styles.sizeInputLabel}>XL
                <input required={true} ref={xlInventoryRef} className={styles.sizeInput} type='number'/>
            </label>
            <label className={styles.sizeInputLabel}>XXL
                <input required={true} ref={xxlInventoryRef} className={styles.sizeInput} type='number'/>
            </label>
        </div>
        <div className={styles.colorSelectContainer}>
            <p>Color:</p>
            <div className={styles.colorMarker} style={{backgroundColor: `${color}`}}>

            </div>
                <HexColorPicker color={color} onChange={setColor} />
        </div>
        <label className={styles.label}>Style
            <input required={true} className={styles.inputField} type='text' onChange={handleStyle} placeholder="Product Style"/>
        </label>
        <label className={styles.label}>Product Model
            <input required={true} className={styles.inputField} type='text' onChange={handleProductModel} placeholder="Product Model"/>
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
                <button onClick={() => open()} type='button'>
                    Upload an Image
                </button>
                );
            }}
        </CldUploadWidget>
        </div>
        <button className={styles.addProductButton} type='submit'>Add Product</button>
    </form>
    {
        isProductAdded && <div className={styles.progressContainer}>
            <p className={styles.progressText}>Adding Product to Database</p>
                <Box sx={{ margin: 'auto', display: 'flex', height: '100px', width : '100px' }}>
                    <CircularProgress color='secondary'/>
                </Box>
        </div>
    }
    </>);
}


export default AddProduct;