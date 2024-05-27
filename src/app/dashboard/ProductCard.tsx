import { Product } from "../utils/Product";
import styles from "./ProductCard.module.css";

interface Props {
    product : Product,
    onRemoveClick: (product : Product) => void
}


function ProductCard(props : Props) {
    return (<div className={styles.container}>
        <div className={styles.imageContainer}>
            <img className={styles.image} src={props.product.images[0]}/>
        </div>
        <div className={styles.textContainer}>
            <p>{props.product.name}</p>
            <p>{props.product.price}</p>
        </div>
    </div>)
}


export default ProductCard;