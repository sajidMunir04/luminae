import { useState } from 'react';
import { useCartStore } from '../lib/store/useCartStore';
import QuantityManagingCard from '../products/QuantityManagingCard';
import { Product } from '../utils/Product';
import styles from './CartItem.module.css';
import { CartProduct } from './CartProduct';

interface Props {
    cartProduct: CartProduct
    onProductRemove: (product: Product) => void
}

function CartItem(props : Props)
{
    const removeCartProduct = useCartStore(state => state.removeFromCart);
    const [quantity,setQuantity] = useState(props.cartProduct.quantity);

    const removeProduct =() => {
        removeCartProduct(props.cartProduct.product);
        props.onProductRemove(props.cartProduct.product);
    }

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
        <p className={styles.priceText}>${props.cartProduct.product.price}</p>
        <div className={styles.quantityContainer}>
            <QuantityManagingCard quantity={props.cartProduct.quantity} setQuantity={() => {setQuantity}}/>
        </div>
        <p className={styles.priceText}>${props.cartProduct.product.price * props.cartProduct.quantity}</p>
        <div>
            <div onClick={removeProduct}>
                <img src="/images/product/delete.svg"/>
            </div>
        </div>
    </div>);
}

export default CartItem;