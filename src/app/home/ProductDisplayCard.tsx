import Image from 'next/image';
import { Product } from '../utils/Product';
import styles from './ProductDisplayCard.module.css';

interface Props extends Product{
    imageLink: string,
    reviewRating: number,
    currentPrice: number
}

function ProductDisplayCard(props : Props)
{
    const imgLink = props.imageLink.substring(2,props.imageLink.length - 1);
    console.log(imgLink);
    return (<div className={styles.container}>
        <div>
            <img src={imgLink} alt='product image'/>
        </div>
        <div className={styles.textContainer}>
            <div>
                    <div>
                        <p>{props.brandName}</p>
                        <div>
                            <p>{props.name}</p>
                        </div>
                    </div>
                    <div className={styles.productRatingSection}>
                        <div>
                            {props.reviewRating >= 1 && <img src="/star(1).png"/>}
                            {props.reviewRating >= 2 && <img src="/star(1).png"/>}
                            {props.reviewRating >= 3 && <img src="/star(1).png"/>}
                            {props.reviewRating >= 4 && <img src="/star(1).png"/>}
                            {props.reviewRating >= 5 && <img src="/star(1).png"/>}
                        </div>
                        <div>
                           <p>({props.reviews?.length})</p>
                        </div>
                    </div>
                    <div className={styles.priceSection}>
                        <div>
                            <p>{props.price}</p>
                        </div>
                        {props.currentPrice != 0 && <div>
                            <p>{props.currentPrice}</p>
                        </div>}
                        {props.currentPrice < props.price && 
                        <div>
                            <p>{Math.round(
                                (props.price -  props.currentPrice) 
                                / props.price) 
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