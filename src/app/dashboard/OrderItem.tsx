import { ProductOrderDetail } from "../cart/OrderFormData";;
import styles from "./OrderItem.module.css";

interface Props {
    cartProduct: ProductOrderDetail
}

function OrderItem(props : Props) {
    return (<div className={styles.container}>
        <div className={styles.productInfoContainer}>
            <div className={styles.productImageContainer}>
                <img className={styles.productImage} src={props.cartProduct.imageLink}/>
            </div>
            <div className={styles.productSpecificInfo}>
                <p className={styles.productNameText}>{props.cartProduct.name}</p>
                <div className={styles.colorContainer}>
                    <p>Color: </p>
                    <div className={styles.colorMarker} style={{color : `${props.cartProduct.color}`}}>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p className={styles.priceText}>${props.cartProduct.unitPrice}</p>
            <p>x{props.cartProduct.quantity}</p>
        </div>
        <div>
            <p className={styles.priceText}>${props.cartProduct.unitPrice * props.cartProduct.quantity}</p>
        </div>
    </div>);
}

export default OrderItem;