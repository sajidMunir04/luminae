import styles from './ProductDisplayCard.module.css';

function ProductDisplayCard(props)
{
    return (<div className={styles.container}>
        <div>
            <img src='/photo.png'/>
        </div>
        <div className={styles.textContainer}>
            <div>
                    <div>
                        <p>{props.brandName}</p>
                        <div>
                            <p>{props.productName}</p>
                        </div>
                    </div>
                    <div className={styles.productRatingSection}>
                        <div>
                            {props.productRating >= 1 && <img src="/star(1).png"/>}
                            {props.productRating >= 2 && <img src="/star(1).png"/>}
                            {props.productRating >= 3 && <img src="/star(1).png"/>}
                            {props.productRating >= 4 && <img src="/star(1).png"/>}
                            {props.productRating >= 5 && <img src="/star(1).png"/>}
                        </div>
                        <div>
                           <p>({props.reviewCount})</p>
                        </div>
                    </div>
                    <div className={styles.priceSection}>
                        <div>
                            <p>{props.currentPrice}</p>
                        </div>
                        {props.originalPrice != 0 && <div>
                            <p>{props.originalPrice}</p>
                        </div>}
                        {props.currentPrice < props.originalPrice && 
                        <div>
                            <p>{Math.round(
                                (props.originalPrice -  props.currentPrice) 
                                / props.originalPrice) 
                                * 100}%</p>
                        </div>
                        }
                    </div>
            </div>
            <div>
                <div>
                    <img src="/Vector.png"/>
                        
                </div>
            </div>
        </div>
    </div>);
}

export default ProductDisplayCard;