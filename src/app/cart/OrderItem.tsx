import { Product } from "../utils/Product";
import { CartProduct } from "./CartProduct";
import styles from "./OrderItem.module.css";

interface Props {
    cartProduct: CartProduct
}

function OrderItem(props : Props) {
    return (<div className={styles.container}>
        <div className={styles.productInfoContainer}>
            <div className={styles.productImageContainer}>
                <img className={styles.productImage} src={props.cartProduct.product.images[0]}/>
            </div>
            <div className={styles.productSpecificInfo}>
                <p className={styles.productNameText}>{props.cartProduct.product.name}</p>
                <div className={styles.colorContainer}>
                    <p>Color: </p>
                    <div className={styles.colorMarker} style={{color : `${props.cartProduct.product.color}`}}>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.textContainerLeft}>
            <p>${props.cartProduct.product.price}</p>
            <p>x{props.cartProduct.quantity}</p>
        </div>
        <div className={styles.textContainerLeft}>
            <p>${props.cartProduct.product.price * props.cartProduct.quantity}</p>
        </div>
    </div>);
}

export default OrderItem;