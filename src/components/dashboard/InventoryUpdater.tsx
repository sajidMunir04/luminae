import { RefCallback, RefObject, Reference, useRef } from "react";
import { Product } from "../utils/Product";
import styles from "./InventoryUpdater.module.css";

interface Props {
    product : Product,
    onCloseButton : () => void,
    onStartUpdate : () => void,
    onFinishUpdate: () => void
}

export interface ProductInventoryUpdate {
    productId : string,
    inventoryData: number[]
}

function InventoryUpdater(props : Props) {

    const xxsInputRef = useRef<HTMLInputElement>(null);
    const xsInputRef = useRef<HTMLInputElement>(null);
    const sInputRef = useRef<HTMLInputElement>(null);
    const mInputRef = useRef<HTMLInputElement>(null);
    const lInputRef = useRef<HTMLInputElement>(null);
    const xlInputRef = useRef<HTMLInputElement>(null);
    const xxlInputRef = useRef<HTMLInputElement>(null);

    const updateProductInventory = async() => {
        props.onStartUpdate();

        const updatedInventory : number[] = props.product.inventoryCount;

        updatedInventory[0] = updatedInventory[0] + getValueFromField(xxsInputRef);
        updatedInventory[1] = updatedInventory[1] + getValueFromField(xsInputRef);
        updatedInventory[2] = updatedInventory[2] + getValueFromField(sInputRef);
        updatedInventory[3] = updatedInventory[3] + getValueFromField(mInputRef);
        updatedInventory[4] = updatedInventory[4] + getValueFromField(lInputRef);
        updatedInventory[5] = updatedInventory[5] + getValueFromField(xlInputRef);
        updatedInventory[6] = updatedInventory[6] + getValueFromField(xxlInputRef);

        const inventoryData : ProductInventoryUpdate = {
            productId: props.product._id,
            inventoryData: updatedInventory
        }

        const result = await fetch('/api/updateProductInventory',{
            method: "PUT",
            body: JSON.stringify(inventoryData)
        })

        const data = await result.json();
        console.log(data);

        props.onFinishUpdate();

        props.onCloseButton();

        if (data.data.acknowledged) {
            alert('Product Inventory Updated');
        }
    }

    const getValueFromField = (ref : RefObject<HTMLInputElement>) => {
        const value : number = parseInt(ref.current?.value!);

        if (typeof(value) === 'number' && value > 0)
            return value;
        else
            return 0;
    }


    return (<div className={styles.container}>
        <div className={styles.closeButton} onClick={props.onCloseButton}>
            <p className={styles.closeBtnText}>X</p>
        </div>
        <div className={styles.subContainer}>
            <h3>Update Inventory for {props.product.name}</h3>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>XXS</p>
                <label className={styles.setStockInputLabel}>Set New Stock
                    <input ref={xxsInputRef} className={styles.inputText} type='number' placeholder="0"/>
                </label>
                <p>Current stock {props.product.inventoryCount[0]}</p>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>XS </p>
                <label className={styles.setStockInputLabel}>Set New Stock
                <input ref={xsInputRef} className={styles.inputText} type='number' placeholder="0"/>
                </label>
                <p>Current stock {props.product.inventoryCount[1]}</p>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>S  </p>
                <label className={styles.setStockInputLabel}>Set New Stock
                    <input ref={sInputRef} className={styles.inputText} type='number' placeholder="0"/>
                </label>
                <p>Current stock {props.product.inventoryCount[2]}</p>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>M  </p>
                <label className={styles.setStockInputLabel}>Set New Stock
                    <input ref={mInputRef} className={styles.inputText} type='number' placeholder="0"/>
                </label>
                <p>Current stock {props.product.inventoryCount[3]}</p>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>L  </p>
                <label className={styles.setStockInputLabel}>Set New Stock
                    <input ref={lInputRef} className={styles.inputText} type='number' placeholder="0"/>
                </label>
                <p>Current stock {props.product.inventoryCount[4]}</p>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>XL </p>
                <label className={styles.setStockInputLabel}>Set New Stock
                    <input ref={xlInputRef} className={styles.inputText} type='number' placeholder="0"/>
                </label>
                <p>Current stock {props.product.inventoryCount[5]}</p>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>XXL</p>
                <label className={styles.setStockInputLabel}>Set New Stock
                    <input ref={xxlInputRef} className={styles.inputText} type='number' placeholder="0"/>
                </label>
                <p>Current stock {props.product.inventoryCount[6]}</p>
            </div>        
            <button onClick={props.product !== undefined ? updateProductInventory : () => {}}>Update Inventory</button>
        </div>
    </div>);
}


export default InventoryUpdater;