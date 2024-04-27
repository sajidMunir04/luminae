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
        <div>
            <div>
                <img src={props.imageLink}/>
            </div>
            <div>
                <p>{props.productName}</p>
                <div>
                    <p>Color: </p>
                    <div className={''} style={{color : `${props.color}`}}>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p>{props.price}</p>
        </div>
        <div>
            <div className={styles.quantityContainer}>
                <p>-</p>
                <p>{props.quantity}</p>
                <p>+</p>
            </div>
        </div>
        <div>
            <p>{props.totalPrice}</p>
        </div>
        <div>
            <div>
                <img src="/trash.png"/>
            </div>
        </div>
    </div>);
}

export default CartItem;