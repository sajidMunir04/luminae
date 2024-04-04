import CartProductCard from "./CartProductCard";
import styles from './CartLayout.module.css';

function CartLayout()
{
    return (<div className={styles.container}>
        <div><p>Cart</p></div>
        <div>
            <CartProductCard unitPrice={25.99} totalPrice={25.99}/>
        </div>
    </div>);
}

export default CartLayout;