import Link from 'next/link';
import styles from './StoreInteractionContainer.module.css';

function StoreInteractionContainer(props)
{
    return (<div className={styles.container}>
        <div className={styles.catergoriesSection}>
            <div className={styles.categoriesButton}>
                <div>
                    <img src={'/Iconcategories.png'}/>
                </div>
                <p>Categories</p>
            </div>
            <div>
                <select className={styles.selectOption}>
                    <option>USD</option>
                </select>
            </div>
            <div>
                <select className={styles.selectOption}>
                    <option>English</option>
                </select>
            </div>
        </div>
        <div className={styles.promotionSection}>
            <div className={styles.promotionImageContainer}>
                <img src={'/Men cosmetic.png'}/>
            </div>
            <div className={styles.promotionTextContainer}>
                <p className={styles.promotionText}>Weekly Men's Toiletries Coupons.</p>
                <p className={styles.promotionTextTwo}>We extend exclusive discounts to our male clientele</p>
            </div>
        </div>
        <div className={styles.buttons}>
                <a className={styles.button} href={'/account'}>
                <img src="/IconSign in.png"/>
                <p>Sign in</p>
                </a>
                <a className={styles.button}>
                    <img src="/Favorides.png"/>
                    <p>Favorites</p>
                </a>
                <a className={styles.button}>
                    <img src="/card.png"/>
                    <p>Cart</p>
                    <p>{props.cartItemsCount}3</p>
                </a>
            </div>
    </div>);
}

export default StoreInteractionContainer;