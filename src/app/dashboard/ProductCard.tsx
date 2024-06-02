import { Product } from "../utils/Product";
import styles from "./ProductCard.module.css";

interface Props {
    product : Product,
    onRemoveClick: (product : Product) => void,
    onOpenInventory: (arg: Product | undefined) => void,
    onOpenPriceUpdate : (product : Product | undefined) => void
}


function ProductCard(props : Props) {
    return (<div className={styles.container}>
        <div className={styles.imageContainer}>
            <img className={styles.image} src={props.product.images[0]}/>
        </div>
        <div className={styles.textContainer}>
            <p className={styles.productNameText}>{props.product.name.substring(0,24)}{props.product.name.length > 24 && '...'}</p>
            <p className={styles.priceText}>$ {props.product.price}</p>
        </div>
        <div className={styles.buttonsContainer}>
            <button onClick={() => props.onRemoveClick(props.product)}>Delete Product</button>
            <button onClick={() => props.onOpenInventory(props.product)}>Update Inventory</button>
            <button onClick={() => props.onOpenPriceUpdate(props.product)}>Update Prices</button>
        </div>
    </div>)
}


export default ProductCard;