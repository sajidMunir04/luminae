import { useCartStore } from '../lib/store/useCartStore';
import { CartProduct } from '../utils/CartProduct';
import { Product } from '../utils/Product';
import styles from './CartItem.module.css';

interface Props {
    product: Product,
    quantity: number
}

function CartItem(props : Props)
{
    const removeCartProduct = useCartStore(state => state.removeFromCart);
    return (<div className={styles.container}>
        <div className={styles.productInfoContainer}>
            <div className={styles.productImageContainer}>
                <img className={styles.productImage} src={props.product.images[0]}/>
            </div>
            <div className={styles.productSpecificInfo}>
                <p className={styles.productNameText}>{props.product.name}</p>
                <div className={styles.colorContainer}>
                    <p>Color: </p>
                    <div className={styles.colorMarker} style={{color : `${props.product.color}`}}>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p className={styles.priceText}>${props.product.price}</p>
        </div>
        <div className={styles.quantityContainer}>
                <p className={styles.quantityButtons}>-</p>
                <p className={styles.quantityText}>{props.quantity}</p>
                <p className={styles.quantityButtons}>+</p>
        </div>
        <div>
            <p className={styles.priceText}>${props.product.price * props.quantity}</p>
        </div>
        <div>
            <div onClick={() => removeCartProduct(props.product)}>
                <img src="/images/product/delete.svg"/>
            </div>
        </div>
    </div>);
}

export default CartItem;