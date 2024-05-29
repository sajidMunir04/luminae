import { Product } from "../utils/Product";
import styles from "./InventoryUpdater.module.css";

interface Props {
    product : Product,
    onCloseButton : () => void
}


function InventoryUpdater(props : Props) {
    


    return (<div className={styles.container}>
        <div className={styles.closeButton} onClick={props.onCloseButton}>

        </div>
        <div className={styles.subContainer}>
            <h3>Update Inventory for {props.product.name}</h3>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>XXS</p>
                <input className={styles.inputText} type='number' placeholder="0"/>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>XS</p>
                <input className={styles.inputText} type='number' placeholder="0"/>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>S</p>
                <input className={styles.inputText} type='number' placeholder="0"/>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>M</p>
                <input className={styles.inputText} type='number' placeholder="0"/>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>L</p>
                <input className={styles.inputText} type='number' placeholder="0"/>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>XL</p>
                <input className={styles.inputText} type='number' placeholder="0"/>
            </div>
            <div className={styles.inventoryUpdateContainer}>
                <p className={styles.sizeText}>XXL</p>
                <input className={styles.inputText} type='number' placeholder="0"/>
            </div>        
            <button>Update Inventory</button>
        </div>
    </div>);
}


export default InventoryUpdater;