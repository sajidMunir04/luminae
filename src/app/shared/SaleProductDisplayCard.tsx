import { useState } from 'react';
import styles from './SaleProductDisplayCard.module.css';
import { CountdownTimer } from '../utils/CountdownTimer';


function SaleProductDisplayCard(props)
{
    const timer = new CountdownTimer(props.saleTimeRemaining);
    const [timeRemaining,setTime] = useState([0,0,0]);
    const updateTimer = (time : number[]) =>{
        //setTime([time[0],time[1],time[2]]);
    }
    timer.start(updateTimer);

    return (<div className={styles.container}>
        <div>
            <p className={styles.dealPeriodText}>{props.saleTimeSpan}</p>
            <p className={styles.saleTimeRemaining}>{timeRemaining[0]} : {timeRemaining[1]} : {timeRemaining[2]}</p>
            <p>hour : min : sec</p>
        </div>
        <div>
            <img src='/photo bag.png'/>
        </div>
        <div className={styles.productInfoContainer}>
            <div>
                <p>{props.productBrand}</p>
                <p>{props.productName}</p>
            </div>
            <div className={styles.productRatingSection}>
                <div>
                    {props.productRating >= 1 && <img src='/star.png'/>}
                    {props.productRating >= 2 && <img src='/star.png'/>}
                    {props.productRating >= 3 && <img src='/star.png'/>}
                    {props.productRating >= 4 && <img src='/star.png'/>}
                    {props.productRating >= 5 && <img src='/star.png'/>}
                </div>
                <div>
                    <p>({props.reviewsCount})</p>
                </div>
            </div>
            <div className={styles.productPriceSection}>
                <div className={styles.priceSectionElement}>
                    <p className={styles.currentPrice}>${props.reducedPrice}</p>
                </div>
                <div className={styles.priceSectionElement}>
                    <p className={styles.originalPrice}>${props.originalPrice}</p>
                </div>
                <div className={styles.priceSectionElement}>
                    <p className={styles.discountPercentage}>-{Math.round((props.reducedPrice / props.originalPrice) * 100)}%</p>
                </div>
            </div>
        </div>
    </div>);
}

export default SaleProductDisplayCard;