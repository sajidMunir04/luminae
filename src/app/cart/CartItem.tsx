import styles from './CartItem.module.css';

interface Props {
    productName: string,
    imageLink: string,
    color: string,
    price: number,
    quantity: number,
    totalPrice: number
}

function CartItem(props : Props)
{
    return (<div className={styles.container}>
        <div className={styles.productInfoContainer}>
            <div className={styles.productImageContainer}>
                <img className={styles.productImage} src={props.imageLink}/>
            </div>
            <div className={styles.productSpecificInfo}>
                <p className={styles.productNameText}>{props.productName}</p>
                <div className={styles.colorContainer}>
                    <p>Color: </p>
                    <div className={styles.colorMarker} style={{color : `${props.color}`}}>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p className={styles.priceText}>${props.price}</p>
        </div>
        <div className={styles.quantityContainer}>
                <p className={styles.quantityButtons}>-</p>
                <p className={styles.quantityText}>{props.quantity}</p>
                <p className={styles.quantityButtons}>+</p>
        </div>
        <div>
            <p className={styles.priceText}>${props.totalPrice}</p>
        </div>
        <div>
            <div>
                <img src="/images/product/delete.svg"/>
            </div>
        </div>
    </div>);
}

export default CartItem;