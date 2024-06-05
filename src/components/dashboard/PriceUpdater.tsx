import { ChangeEvent, useState } from "react";
import { Product } from "../utils/Product";
import styles from "./PriceUpdater.module.css";

interface Props {
    product: Product,
    onCloseButton: () => void,
    onStartUpdate : () => void,
    onFinishUpdate: () => void
}


function PriceUpdater(props : Props) {

    const [price,setPrice] = useState(props.product.price);

    const updateProductPrice = async() => {
        props.onStartUpdate();
        const updateData : Record<string,string | number> = {
            productId: props.product._id,
            newPrice: price
        }

        const result = await fetch('/api/updateProductPrice',{
            method: "PUT",
            body: JSON.stringify(updateData)
        })

        const data = await result.json();
        console.log(data);

        props.onFinishUpdate();
        props.onCloseButton();
        if (data.data.acknowledged) {
            alert('Product Price Updated');
        }
    }

    const handleInput = (e : ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(e.target.value));
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (<div className={styles.container}>
        <div className={styles.closeButton} onClick={props.onCloseButton}>
            <p className={styles.closeBtnText}>X</p>
        </div>
        <form className={styles.subContainer} onSubmit={handleSubmit}>
            <div>
                <p>Current Price</p>
                <p>${props.product.price}</p>
            </div>
            <label className={styles.setPriceInputLabel}>New Price $
                <input required={true} type='number' onChange={handleInput}/>
            </label>
            <button type='submit' onClick={props.product !== undefined ? updateProductPrice : () => {}}>Update Price</button>
        </form>
    </div>);
}

export default PriceUpdater;