import styles from './CartProductCard.module.css';
function CartProductCard(props)
{
    return (<div className={styles.container}>
        <div>
            <div>
                <img src='/photo(1).png'/>
            </div>
            <div>
                <p>{props.productName}</p>
                <div>
                    <p>Color: </p>
                    <div className={''} style={{color : props.productColor}}>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p>{props.unitPrice}</p>
        </div>
        <div>
            <div>
                <p>-</p>
                <p>1</p>
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

export default CartProductCard;