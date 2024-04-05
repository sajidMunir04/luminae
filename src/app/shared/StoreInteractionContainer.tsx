import Link from 'next/link';
import styles from './StoreInteractionContainer.module.css';

function StoreInteractionContainer(props)
{
    return (<div className={styles.container}>
        <div className={styles.catergoriesSection}>
            <div className={styles.categoriesButton}>
                <img src={'/Iconcategories.png'}/>
                <p>Categories</p>
            </div>
            <div>
                <select>
                    <option>USD</option>
                </select>
            </div>
            <div>
                <select>
                    <option>English</option>
                </select>
            </div>
        </div>
        <div className={styles.promotionSection}>
            <div>
                <img src={'/Men cosmetic.png'}/>
            </div>
            <div>
                <p>Weekly Men's Toiletries Coupons.</p>
                <p>We extend exclusive discounts to our male clientele</p>
            </div>
        </div>
        <div className={styles.buttons}>
                <div className={styles.button}>
                    <Link href={'/account'}>
                    <img src="/IconSign in.png"/>
                    <p>Sign in</p>
                    </Link>
                </div>
                <div className={styles.button}>
                    <img src="/IconSign in.png"/>
                    <p>Favorites</p>
                </div>
                <div className={styles.button}>
                    <img src="/IconSign in.png"/>
                    <p>Cart</p>
                    <p>{props.cartItemsCount}3</p>
                </div>
            </div>
    </div>);
}

export default StoreInteractionContainer;