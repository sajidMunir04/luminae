import { useState } from 'react';
import { useCartStore } from '../lib/store/useCartStore';
import QuantityManagingCard from '../products/QuantityManagingCard';
import { Product } from '../utils/Product';
import styles from './CartItem.module.css';
import { CartProduct } from './CartProduct';

interface Props {
    product: Product,
    quantity: number,
    onProductQuantityChange: (product: Product,quantity: number) => void,
    onProductRemove: (product: Product) => void
}

function CartItem(props : Props)
{
    const removeCartProduct = useCartStore(state => state.removeFromCart);
    const [quantity,setQuantity] = useState(props.quantity);

    const setTheQuantity = (quantity : number) => {
        setQuantity(quantity);
        props.onProductQuantityChange(props.product,quantity);
    }

    const removeProduct =() => {
        removeCartProduct(props.product);
        props.onProductRemove(props.product);
    }

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
        <p className={styles.priceText}>${props.product.price}</p>
        <div className={styles.quantityContainer}>
            <QuantityManagingCard quantity={quantity} setQuantity={setTheQuantity}/>
        </div>
        <p className={styles.priceText}>${props.product.price * quantity}</p>
        <div>
            <div onClick={removeProduct}>
                <img src="/images/product/delete.svg"/>
            </div>
        </div>
    </div>);
}

export default CartItem;