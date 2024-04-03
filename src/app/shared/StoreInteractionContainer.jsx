import styles from './StoreInteractionContainer.module.css';

function StoreInteractionContainer(props)
{
    return (<div className={styles.container}>
        <div>
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
        <div>
            <div>
                <img src={'/Men cosmetic.png'}/>
            </div>
            <div>
                <p>Weekly Men's Toiletries Coupons.</p>
                <p>We extend exclusive discounts to our male clientele</p>
            </div>
        </div>
        <div>
            <div>
                <div>
                    <img src="/IconSign in.png"/>
                </div>
                <div>
                    <p>Sign in</p>
                </div>
                <div>
                    <img src="/IconSign in.png"/>
                </div>
                <div>
                    <p>Favorites</p>
                </div>
                <div>
                    <img src="/IconSign in.png"/>
                </div>
                <div>
                    <p>Cart</p>
                </div>
                <div>
                    <p>{props.cartItemsCount}3</p>
                </div>
            </div>
        </div>
    </div>);
}

export default StoreInteractionContainer;